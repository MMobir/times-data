from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class IndexDef:
    name: str
    aliases: tuple[str, ...]
    related: tuple[str, ...]
    description: str


INDEX_REGISTRY: dict[str, IndexDef] = {
    'age': IndexDef(
        name='age',
        aliases=('life', 'jot'),
        related=(),
        description='Index for age (number of years since installation) into a parameter shaping curve; default elements 1–200.',
    ),
    'all_r': IndexDef(
        name='all_r',
        aliases=('all_reg',),
        related=('r',),
        description='All internal and external regions.',
    ),
    'bd': IndexDef(
        name='bd',
        aliases=('bnd_type',),
        related=('lim',),
        description='Index of bound type; subset of lim, having the internally fixed elements ‘LO’, ‘UP’, ‘FX’.',
    ),
    'c': IndexDef(
        name='c',
        aliases=('com', 'com1', 'com2', 'com3'),
        related=('cg',),
        description='User defined list of all commodities in all regions; subset of cg.',
    ),
    'cg': IndexDef(
        name='cg',
        aliases=('com_grp', 'cg1', 'cg2', 'cg3', 'cg4'),
        related=('c',),
        description='User defined list of all commodities and commodity groups in all regions; each commodity itself is considered a commodity group; initial elements are the members of com_type.',
    ),
    'com_type': IndexDef(
        name='com_type',
        aliases=(),
        related=(),
        description='Indicator of commodity type; initialized to the predefined types DEM, NRG, MAT, ENV, FIN (see Table 1).',
    ),
    'costagg': IndexDef(
        name='costagg',
        aliases=(),
        related=(),
        description='Indicator of cost aggregation type; initialized to list of predefined types (see Table 1).',
    ),
    'cur': IndexDef(
        name='cur',
        aliases=('cur',),
        related=(),
        description='User defined list of currency units.',
    ),
    'datayear': IndexDef(
        name='datayear',
        aliases=(),
        related=('year',),
        description='Years for which model input data are specified.',
    ),
    'dem_sect': IndexDef(
        name='dem_sect',
        aliases=(),
        related=(),
        description='Indicator of demand sector; initialized to list of predefined sectors (see Table 1).',
    ),
    'env_type': IndexDef(
        name='env_type',
        aliases=(),
        related=(),
        description='Indicator of environmental commodity type; initialized to list of predefined elements (see Table 1).',
    ),
    'ie': IndexDef(
        name='ie',
        aliases=('impexp',),
        related=(),
        description='Export/import exchange indicator; internally fixed = \'EXP\' for exports and \'IMP\' for imports.',
    ),
    'io': IndexDef(
        name='io',
        aliases=('inout',),
        related=(),
        description='Input/Output indicator for defining whether a commodity flow enters or leaves a process; internally fixed = \'IN\' for enters and \'OUT\' for leaves.',
    ),
    'j': IndexDef(
        name='j',
        aliases=('jj',),
        related=(),
        description='Indicator for elastic demand steps and sequence number of the shape/multi curves; default elements 1–999.',
    ),
    'kp': IndexDef(
        name='kp',
        aliases=(),
        related=(),
        description='Index for “kink” points in ETL formulation; currently limited to 1-6 {can be extended in <case>.run file by including SET KP / 1*n /; for n-kink points.',
    ),
    'lim': IndexDef(
        name='lim',
        aliases=('lim_type', 'l'),
        related=('bd',),
        description='Index of limit types; internally fixed = \'LO\', \'UP\', \'FX\' and \'N\'.',
    ),
    'nrg_type': IndexDef(
        name='nrg_type',
        aliases=(),
        related=(),
        description='Indicator of energy commodity type; initialized to predefined types (see Table 1).',
    ),
    'p': IndexDef(
        name='p',
        aliases=('prc',),
        related=(),
        description='User defined list of all processes in all regions.',
    ),
    'pastyear': IndexDef(
        name='pastyear',
        aliases=('pyr',),
        related=('modlyear', 'year'),
        description='Years for which past investments are specified; pastyears should usually be before the beginning of the first period but past investments may also be specified on later years.',
    ),
    'prc_grp': IndexDef(
        name='prc_grp',
        aliases=(),
        related=(),
        description='List of process groups; internally established in MAPLIST.DEF (see Table 1).',
    ),
    'r': IndexDef(
        name='r',
        aliases=('reg',),
        related=('all_r',),
        description='Explicit regions within the area of study. Subset of all_r.',
    ),
    's': IndexDef(
        name='s',
        aliases=('all_ts', 'ts', 's2', 'sl'),
        related=(),
        description='Timeslice divisions of a year, at any of the tslvl levels.',
    ),
    'side': IndexDef(
        name='side',
        aliases=(),
        related=(),
        description='Side indicator for defining coefficients in user constraints; internally fixed = \'LHS\', \'RHS\'.',
    ),
    't': IndexDef(
        name='t',
        aliases=('milestonyr', 'tt'),
        related=('year',),
        description='Representative years for the model periods.',
    ),
    'teg': IndexDef(
        name='teg',
        aliases=(),
        related=('p',),
        description='Technologies modelled with endogenous technology learning. Subset of p.',
    ),
    'tslvl': IndexDef(
        name='tslvl',
        aliases=(),
        related=(),
        description='Timeslice level indicator; internally fixed = \'ANNUAL\', \'SEASON\', \'WEEKLY\', \'DAYNITE\'.',
    ),
    'u': IndexDef(
        name='u',
        aliases=('units', 'units_com', 'units_cap', 'units_act'),
        related=(),
        description='List of all units; maintained in the file UNITS.DEF.',
    ),
    'uc_grptype': IndexDef(
        name='uc_grptype',
        aliases=('e',),
        related=(),
        description='Fixed internal list of the key types of variables (see Table 1).',
    ),
    'uc_n': IndexDef(
        name='uc_n',
        aliases=('ucn',),
        related=(),
        description='User specified unique indicator for a user constraint.',
    ),
    'uc_name': IndexDef(
        name='uc_name',
        aliases=(),
        related=(),
        description='Fixed list of indicators associated with various attributes that can be referenced in user constraints to be applied when deriving a coefficient (see Table 1).',
    ),
    'unit': IndexDef(
        name='unit',
        aliases=(),
        related=(),
        description='List of capacity blocks that can be added in lumpy investment option; default elements 0–100; the element \'0\' describes the case when no capacity is added.',
    ),
    'units_act': IndexDef(
        name='units_act',
        aliases=(),
        related=('u',),
        description='List of activity units; maintained in the file UNITS.DEF.',
    ),
    'units_cap': IndexDef(
        name='units_cap',
        aliases=(),
        related=('u',),
        description='List of capacity units; maintained in the file UNITS.DEF.',
    ),
    'units_com': IndexDef(
        name='units_com',
        aliases=(),
        related=('u',),
        description='List of commodity units; maintained in the file UNITS.DEF.',
    ),
    'v': IndexDef(
        name='v',
        aliases=('modlyear',),
        related=('pastyear', 't'),
        description='Union of the set pastyear and t corresponding to all modelling periods.',
    ),
    'ww': IndexDef(
        name='ww',
        aliases=('allsow',),
        related=('sow', 'w'),
        description='States of the world that can be used; default elements 1–64; under user control by the dollar control parameter $SET MAXSOW <n> in the <case>.RUN file',
    ),
    'year': IndexDef(
        name='year',
        aliases=('allyear', 'll'),
        related=('datayear', 'pastyear', 'modlyear', 'milestonyr'),
        description='Years that can be used in the model; default range 1850-2200; under user control by the dollar control parameters $SET BOTIME <y> and $SET EOTIME <y> in the <case>.RUN file.',
    ),
}
