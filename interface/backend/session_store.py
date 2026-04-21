from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

from times_data.io import write_model
from times_data.model import Model


@dataclass
class SessionRecord:
    session_id: str
    model: Model
    model_path: Path | None = None
    dirty: bool = False


class SessionStore:
    def __init__(self) -> None:
        self._sessions: dict[str, SessionRecord] = {}

    def open(self, model: Model, model_path: Path | None = None) -> SessionRecord:
        session_id = uuid4().hex
        record = SessionRecord(
            session_id=session_id,
            model=model,
            model_path=model_path,
            dirty=False,
        )
        self._sessions[session_id] = record
        return record

    def get(self, session_id: str) -> SessionRecord:
        if session_id not in self._sessions:
            raise KeyError(f"Unknown session_id: {session_id}")
        return self._sessions[session_id]

    def save(self, session_id: str, target_path: Path | None = None) -> SessionRecord:
        record = self.get(session_id)
        destination = target_path or record.model_path
        if destination is None:
            raise ValueError("No model_path available for save.")
        write_model(record.model, destination)
        record.model_path = destination
        record.dirty = False
        return record

    def close(self, session_id: str) -> bool:
        if session_id not in self._sessions:
            return False
        del self._sessions[session_id]
        return True

    def mark_dirty(self, session_id: str, dirty: bool = True) -> SessionRecord:
        record = self.get(session_id)
        record.dirty = dirty
        return record

    def clear(self) -> None:
        self._sessions.clear()
