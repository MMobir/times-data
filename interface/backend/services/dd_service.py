from __future__ import annotations

from pathlib import Path
from typing import Any

from times_data.compiler.dd_compiler import compile_dd
from times_data.io import import_dd
from times_data.model import Model


def _resolve_dd_files(paths: list[str]) -> list[Path]:
    files: list[Path] = []
    for raw_path in paths:
        path = Path(raw_path)
        if path.is_dir():
            files.extend(sorted(path.glob("*.DD")))
            files.extend(sorted(path.glob("*.dd")))
        else:
            files.append(path)
    seen: set[Path] = set()
    deduped: list[Path] = []
    for item in files:
        if item not in seen:
            deduped.append(item)
            seen.add(item)
    return deduped


def import_model_from_dd(dd_paths: list[str]) -> tuple[Model, list[str]]:
    files = _resolve_dd_files(dd_paths)
    if not files:
        raise ValueError("No DD files found for import.")
    model = import_dd(files)
    return model, [str(path) for path in files]


def export_model_to_dd(model: Model, output_path: str) -> dict[str, Any]:
    out_dir = Path(output_path)
    generated = compile_dd(model, out_dir)
    return {
        "output_path": str(out_dir),
        "files": [str(path) for path in generated],
    }
