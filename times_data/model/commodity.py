from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum

_DEFAULT_BALANCE: dict[str, str] = {
    "NRG": "UP",
    "DEM": "UP",
    "ENV": "UP",
    "MAT": "FX",
    "FIN": "FX",
}


class CommodityType(Enum):
    NRG = "NRG"
    DEM = "DEM"
    MAT = "MAT"
    ENV = "ENV"
    FIN = "FIN"


@dataclass
class Commodity:
    name: str
    ctype: CommodityType
    description: str = ""
    unit: str = ""
    timeslice_level: str = "ANNUAL"  # ANNUAL, SEASON, WEEKLY, DAYNITE
    balance_type: str = ""  # UP, LO, FX, N — default depends on ctype

    def __post_init__(self) -> None:
        if not self.balance_type:
            self.balance_type = _DEFAULT_BALANCE[self.ctype.value]
