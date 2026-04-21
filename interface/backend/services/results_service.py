from __future__ import annotations

import csv
from pathlib import Path


SUPPORTED_RESULTS_FORMATS = {
    ".csv": ",",
    ".tsv": "\t",
}


def _table_metadata_from_file(path: Path) -> dict:
    suffix = path.suffix.lower()
    if suffix not in SUPPORTED_RESULTS_FORMATS:
        raise ValueError(f"Unsupported results format: {path.suffix}")

    delimiter = SUPPORTED_RESULTS_FORMATS[suffix]
    columns: list[str] = []
    row_count = 0

    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.reader(handle, delimiter=delimiter)
        for row_idx, row in enumerate(reader):
            if row_idx == 0:
                columns = [cell.strip() for cell in row if cell.strip()]
                continue
            if any(cell.strip() for cell in row):
                row_count += 1

    return {
        "name": path.stem,
        "path": str(path),
        "format": suffix.lstrip("."),
        "columns": columns,
        "row_count": row_count,
    }


def open_results(results_path: str) -> dict:
    path = Path(results_path)
    files: list[Path] = []

    if path.is_file():
        files = [path]
    elif path.is_dir():
        for suffix in sorted(SUPPORTED_RESULTS_FORMATS):
            files.extend(sorted(path.glob(f"*{suffix}")))
    else:
        raise ValueError(f"Results path does not exist: {results_path}")

    tables = [_table_metadata_from_file(file_path) for file_path in files]
    return {
        "results_path": str(path),
        "tables": tables,
    }
