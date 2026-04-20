from __future__ import annotations

from collections import defaultdict
import sys
from pathlib import Path

import click


@click.group()
@click.version_option("0.1.0", prog_name="times-data")
def cli() -> None:
    """times-data: Open-source data layer for TIMES energy models.

    Import, validate, edit, and compile TIMES models in Python.
    """


@cli.command("import-dd")
@click.argument("dd_path", type=click.Path(exists=True))
@click.option("-o", "--output", required=True, help="Output directory for model")
@click.option("--name", default=None, help="Model name (default: directory name)")
def import_dd_cmd(dd_path: str, output: str, name: str | None) -> None:
    """Import DD files into a times-data model.

    DD_PATH can be a directory containing .dd files or a single .dd file.
    The imported model is written as human-readable YAML files.
    """
    from times_data.io import import_dd, write_model

    dd = Path(dd_path)
    if dd.is_file():
        dd_files = [dd]
    else:
        dd_files = sorted(dd.glob("*.dd")) + sorted(dd.glob("*.DD"))

    if not dd_files:
        click.echo(click.style(f"No .dd files found in {dd_path}", fg="red"))
        sys.exit(1)

    click.echo(f"Importing {len(dd_files)} DD file(s)...")

    model = import_dd(dd_files)
    if name:
        model.config.name = name

    _print_summary(model)

    out = Path(output)
    write_model(model, out)
    click.echo(f"\nWritten to {out}/")


@cli.command("export-dd")
@click.argument("model_path", type=click.Path(exists=True))
@click.option("-o", "--output", required=True, help="Output directory for DD files")
def export_dd_cmd(model_path: str, output: str) -> None:
    """Compile a times-data model to GAMS DD files.

    MODEL_PATH is a directory containing YAML model files (from import-dd or new).
    Output includes BASE.DD, timeslice DD, and a .RUN file ready for GAMS.
    """
    from times_data.io import read_model
    from times_data.validation import validate_all
    from times_data.compiler import compile_dd

    model = read_model(Path(model_path))

    msgs = validate_all(model)
    errors, warnings = _print_validation_report(msgs, show_warnings=True)
    if errors:
        click.echo("\nFix errors before compiling.")
        sys.exit(1)
    if warnings:
        click.echo(click.style(
            f"\nProceeding with {len(warnings)} validation warning(s).",
            fg="yellow",
        ))

    out = Path(output)
    generated = compile_dd(model, out)
    click.echo(f"Compiled {len(generated)} DD file(s) to {out}/")
    for f in generated:
        click.echo(f"  {f.name} ({f.stat().st_size:,} bytes)")


@cli.command()
@click.argument("path", type=click.Path(exists=True))
def validate(path: str) -> None:
    """Validate a TIMES model.

    PATH is a directory containing YAML model files.
    Returns exit code 1 if any errors are found.
    """
    from times_data.io import read_model
    from times_data.validation import validate_all

    model = read_model(Path(path))
    msgs = validate_all(model)

    errors, warnings = _print_validation_report(msgs, show_warnings=True)

    if errors:
        sys.exit(1)


@cli.command()
@click.argument("path", type=click.Path(exists=True))
def info(path: str) -> None:
    """Show detailed info about a TIMES model.

    PATH is a directory containing YAML model files.
    """
    from times_data.io import read_model

    model = read_model(Path(path))
    click.echo()
    click.echo(model.describe())
    click.echo()


@cli.command()
@click.argument("name")
@click.option("--regions", default="REG1", help="Comma-separated region names")
@click.option("--periods", default="2020,2030,2040,2050", help="Comma-separated period years")
def new(name: str, regions: str, periods: str) -> None:
    """Create a new empty TIMES model.

    Creates a model directory with config, ready for adding commodities and processes.
    """
    from times_data.io import write_model
    from times_data.model import Model, ModelConfig

    region_list = [r.strip() for r in regions.split(",") if r.strip()]
    period_list = [int(p.strip()) for p in periods.split(",") if p.strip()]

    config = ModelConfig(
        name=name,
        regions=region_list,
        start_year=period_list[0] if period_list else 2020,
        periods=period_list,
    )
    model = Model(config=config)

    out = Path(name)
    write_model(model, out)
    click.echo(f"Created model at ./{name}/")


def _print_summary(model) -> None:
    s = model.summary()
    click.echo(f"\n  Model:       {s['name']}")
    click.echo(f"  Regions:     {s['regions']}")
    click.echo(f"  Periods:     {s['periods']}")
    click.echo(f"  Commodities: {s['commodities']}")
    click.echo(f"  Processes:   {s['processes']}")
    click.echo(f"  Parameters:  {s['parameter_values']} values")


def _print_validation_report(msgs, show_warnings: bool) -> tuple[list, list]:
    errors = [m for m in msgs if m.level == "error"]
    warnings = [m for m in msgs if m.level == "warning"]

    if errors:
        click.echo(click.style(f"\nERRORS ({len(errors)})", fg="red"))
        for msg in errors:
            _echo_validation_message(msg, color="red")

    if show_warnings and warnings:
        click.echo(click.style(f"\nWARNINGS ({len(warnings)})", fg="yellow"))
        for msg in warnings:
            _echo_validation_message(msg, color="yellow")

    if msgs:
        click.echo()
        click.echo("Summary by category:")
        buckets = defaultdict(lambda: {"error": 0, "warning": 0})
        for msg in msgs:
            buckets[msg.category][msg.level] += 1
        for category in sorted(buckets):
            c = buckets[category]
            click.echo(f"  {category}: {c['error']} error(s), {c['warning']} warning(s)")
    click.echo()
    click.echo(f"{len(errors)} error(s), {len(warnings)} warning(s)")
    return errors, warnings


def _echo_validation_message(msg, color: str) -> None:
    entity_prefix = f"[{msg.entity}] " if msg.entity else ""
    click.echo(
        click.style(
            f"  - [{msg.category}] {entity_prefix}{msg.message}",
            fg=color,
        )
    )
    if msg.hint:
        click.echo(f"      fix: {msg.hint}")


if __name__ == "__main__":
    cli()
