---
type: faq
title: "FAQ: Demands"
aliases: []
tags: [faq, demands]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Demands

This page collects frequently asked questions and expert answers about **Demands** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 163
**Top Q&As shown:** 20

---

### 1. Modifying Timeslice and sector definitions

**Asked by:** maria | **Forum:** VEDA FE - Questions and Observations | **Thread:** [99](../../raw/forum/threads/99.json) | **Posts:** 200

**Question:**
> Good afternoon,
I'm quite new using VEDA, so probably you will think my questions are stupid.
My problem is I'm trying to improve a model already wirking and I'm having some problems.
I'd like to imcrease the time slices' number, but I have notce that it's impossible to do it without creating a new model.
When I create a new model it doesn't work.
Is it possible to modify the old model?? And furth

**Answer** (by AKanudia):
> Both the things you mention - modifying timeslices and sectors, are very much possible to do in a working model.
All you need to do is to start the SYNC process from scratch after making such changes.
You can do this with the
Start from scratch
option under the
Tools
menu.
Apart from the two changes referred to here, changes in
regional definition
is the only other case when one needs to start from scratch. This is because with these changes, any of the previously processed information can potentially be invalid.

### 2. Issues in Scaling the Model

**Asked by:** Anuradha | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1519](../../raw/forum/threads/1519.json) | **Posts:** 75

**Question:**
> Hi,
I am working on a model that runs fine from 2020 to 2024, but after that it shows infeasibility. I tried changing the demand and supply, but I am not able to understand what the issue is. I am attaching the lst, QA check, and run files. It would be great if anyone could help me here.
Thank you,
Anuradha

**Answer** (by Antti-L):
> Ok, so now you are getting a much clearer report in the *
run_log
and in the
listing file
:
Row 'EQ_CUMFLO('R0N','IMPELC',ACT,2020,2200)' infeasible, all entries at implied bounds.
Number of equations in conflict: 1
fixed: EQ_CUMFLO('R0N','IMPELC',ACT,2020,2200) = 0
Number of variables in conflict: 6
lower: VAR_ACT('R0N',2020,2020,'IMPELC',ANNUAL) > 56.89
lower: VAR_ACT('R0N',2021,2021,'IMPELC',ANNUAL) > 57.9283
lower: VAR_ACT('R0N',2025,2025,'IMPELC',ANNUAL) > 62.0816
lower: VAR_ACT('R0N',2030,2030,'IMPELC',ANNUAL) > 67.2733
lower: VAR_ACT('R0N',2035,2035,'IMPELC',ANNUAL) > 72.4649
upper: VAR

### 3. Modeling investments and mandates

**Asked by:** qzaus | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [966](../../raw/forum/threads/966.json) | **Posts:** 75

**Question:**
> I am interested in modeling some mandates and investment policies. For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates? Should I also modify corresponding demands to reflect these changes? Thank you!

**Answer** (by Antti-L):
> > [(06-03-2021, 01:00 AM)qzaus Wrote:] For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates?
I have been using market share constraints, for the share of EVs in the total sales of new cars, in addition to market share constraints for EVs in the total passenger car travel demand.  I think at least the former could be a "real-world" policy mandate. But anyway, almost any policy requirement that can be described by convex programmi

### 4. TSLV for load curve setting

**Asked by:** zhangshu | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1203](../../raw/forum/threads/1203.json) | **Posts:** 70

**Question:**
> I read the post with the title "TSLV" but still have doubts.
For me, I would like to model the demand at DAYNITE level for agriculture, industry and building sector (like Starter DEMO), and for the transportation sector, I would like to model the fixed charging profile just as that in AdvDEMO.
What's different is that there are multiple processes in my industrial sector that contain material flows

**Answer** (by Antti-L):
> >
All subsector ELC commodities (such as IND_IBU_ELC) had load curve attributes but the INDELC didn't.
Hmm... you said earlier that you would define COM_FR for Clinker and Cement.  Are you now saying that you define it for the sebsector ELC commodities (such as IND_IBU_ELC)?  That would of course make things somewhat different.  Recall also, as I said earlier, that COM_FR defined on a DAYNITE level power commodity will usually have no effect, because the flows of such a commodity are usually already tracked on the DAYNITE level.
COM_FR tells the model generator how to split an aggregate flow (

### 5. UC not working

**Asked by:** Lukas Novak | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1265](../../raw/forum/threads/1265.json) | **Posts:** 65

**Question:**
> Dear forum,
I am struggling to make one of UCs in my model work. I am trying to restrict the model import of electricity by level of 10 % of all the demands for electricity together. Please see the UC in Excel attached.
Following the notation in the file, as I understand it, I get sum of all the imports of ELCHIG from all the import processes minus 0,1 times all the electricity flows (ELCHIGG + EL

**Answer** (by Antti-L):
> >
I am trying to restrict the model for low bound for electrical LDV  by level of 10 %. I tried the following: replaced UC_FLO on UC_IRE and UC_ACT – there are no difference and IMPNRGZ are identical (UC_S_TLELC values are the same in 2020-2055).
You cannot use UC_IRE for
normal
processes, only for IRE processes (
trade
processes).  I suppose the TLE* processes are not IRE processes, and if so, using
UC_FLO
is fine (and UC_IRE cannot be used), unless they happen to be
storage
processes?
I am not able to see any clear issues in the six UCs shown in your picture, except that you seem to be defin

### 6. Error at line 904570: Equation infeasible due to rhs value

**Asked by:** frangb99 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1373](../../raw/forum/threads/1373.json) | **Posts:** 65

**Question:**
> Hello, I am runing one model where I have just added one demand for different years as it is shownin this image:
But when is runing, it appears the next in the run_log.
Does anybody knows what is happening?

**Answer** (by Antti-L):
> Well yes, the log shows that Cplex finds the model infeasible already at the presolve phase, and in the listing file you can find additional information pointing to an infeasibility at a specific timeslice, and both the exogenous demand for DKER_AIR and the exports of EXP_KRE_DK appear to be involved in that condition.  That is useful information:
Number of equations in conflict: 2
lower: EQG_COMBAL('REG1',2040,'DKER_AIR',W01D5H02) > 0.000342466
lower: EQG_COMBAL('REG1',2040,'EXP_KRE_DK',W01D5H02) > 0
Number of variables in conflict: 1
lower: VAR_ACT('REG1',2040,2040,'EXPKRE_DK',W01D5H02) > 0


### 7. COM_FR at DAYNITE nott working

**Asked by:** Pacarval | **Forum:** VEDA FE - Questions and Observations | **Thread:** [539](../../raw/forum/threads/539.json) | **Posts:** 65

**Question:**
> Dear Antti,
I am runninng my model with 108 timeslices (12 seasons, 3 weekdays (weekday, saturday, sunday) and 3 day periods (morning, day, night). I have a load curve for the electricity sector with 108 timeslices and for the moment I am using the same load curve for all ELC demands (residential, commercial, industry, etc.). When I use the COM_FR to set the load curve the model only 'reads' 48 ti

**Answer** (by AKanudia):
> Region and TimeSlice definitions (~BookRegions_Map and ~TimeSlices Tags) are read only when SYNC starts from scratch.
So, Tools - Start from scratch should solve the issue for both Pablo and you.

### 8. Question about dummy imports

**Asked by:** Erin6745 | **Forum:** VEDA BE - Questions and Observations | **Thread:** [305](../../raw/forum/threads/305.json) | **Posts:** 64

**Question:**
> Dear Sir.,
When I check the dummy imports table, I found some dummy imports of DEM. and the commodities are all belong to transportation (see table below). I have already set the driver of the demand of transpotation. I don't know why there are dummy imports of DEM.
Also my results have some dummy imports of NRG, but not in start year. Did there have any mistake in my demand drivers allocation tab

**Answer** (by Antti-L):
> A small side note concerning the attribute descriptions shown in the templates. I don't know what is the origin of these descriptions, but many of them appear misleading:
CHPR~FX
is described as "Fix output to power ratio". However, in TIMES
NCAP_CHPR
represents the
heat to power ratio
, not the output to power ratio.
CEH
is described as "Ratio of electricity lost to output". However, in TIMES
VDA_CEH
represents the ratio of
electricity lost to heat gained
(when moving along the isofuel line, and assuming CEH < 1).
LIFE
is described as "Remaining lifetime".  However, in TIMES
NCAP_TLIFE
repres

### 9. Appropriate solve parameter for large model

**Asked by:** Kannan | **Forum:** VEDA FE - Questions and Observations | **Thread:** [313](../../raw/forum/threads/313.json) | **Posts:** 64

**Question:**
> Dear All
I thought of sharing some of our experience is solving a computational intensive  TIMES models.  Here goes the background…..
Some of you may ware that we at Paul Scherrer Institut (PSI) developed a Swiss TIMES electricity model (STEM-E) with an hourly diurnal representation, i.e. 288 annual timeslices.  This model runs well and we have publications too.
Since January 2013, we extended the

**Answer** (by Antti-L):
> Thanks for the enlightening follow-up.
To me it seems that you might have numerical problems caused by extending the StartYear backwards from 2015 to 2013. There is nothing wrong with it as such, but there could be problems caused by e.g. cumulative constraints when changing the StartYear like that. I would suggest to try using the following period definition, and see if it improves the numerical stability:
~StartYear=2015
~TimePeriods=[2, 7, 4, 5, 5, 5, ...]
That would still give you the Milestone years [2015, 2020, 2025, 2030, ...].
I also suggest using OBLONG if you don't have it already ac

### 10. What does dummy import mean?

**Asked by:** huichenpku | **Forum:** VEDA FE - Questions and Observations | **Thread:** [402](../../raw/forum/threads/402.json) | **Posts:** 63

**Question:**
> Hello,
I set two kinds of coal to produce electricity to sastify the electricity demand, but I find dummy imports satisfy most of
electricity demand instead of coal. There are not any constraints for coal mining, so anyone can explain it? Attached is my simple example.
uploads/271/My_2.zip

**Answer** (by Antti-L):
> On the relation
between NCAP_PASTI and STOCK
:
NCAP_PASTI and PRC_RESID (alias STOCK) should basically
be considered as two alternative ways to define the existing capacity of a
process. You should thus not use both at the same time for any single process
(unless you know what you are doing).
Internally
in TIMES, STOCK is implemented as a special kind of NCAP_PASTI, which always has
the vintage year B(T1)–1. Therefore, as you have noticed, if both NCAP_PASTI
and STOCK are used for the same process, they will sum up, whenever the vintage
years of NCAP_PASTI(v) are different from B(t1)–1.
How to

### 11. ObjZ Question

**Asked by:** mbr1818 | **Forum:** VEDA FE - Questions and Observations | **Thread:** [644](../../raw/forum/threads/644.json) | **Posts:** 63

**Question:**
> Dear Community Members,
I have read the TIMES manuals about the objective function formulation, which includes 11 components:
{INVCOST, INVTAXSUB, INVDECOM, FIXCOST, FIXTAXSUB, SURVCOST, VARCOST, VARTAXSUB, ELASTCOST, LATEREVENUES} - SALVAGE.
In VEDA BE there are seven cost attributes: Cost_Act, Cost_Comx, Cost_Flo, Cost_Fom, Cost_Inv, Cost_ire, and Cost_Salv. I am wondering if these attribute val

**Answer** (by Antti-L):
> The 15 reporting attributes I listed were taken from
PART V: VEDA Back-End
, Appendix A: VEDA-BE TIMES Attributes. Therefore, according to the documentation, these 15 reporting attributes are indeed included in the BE reporting. You should be able to verify that easily yourself, by looking at the *.VDE file produced from the TIMES run of your EPAUS9rT model. That VDE file lists all the reporting attributes included in the BE reporting of your model. The VDE files should reside in your VEDA working folder.
If you don't find all those attributes listed in your *.VDE file, please post the file he

### 12. Elastic Demand and Investment Cost

**Asked by:** soniayeh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [324](../../raw/forum/threads/324.json) | **Posts:** 61

**Question:**
> Hi,
We have been looking into elastic demand results and what that means it terms of investments, cost saved, etc.
It appears that by imposing the ED on energy service, the reductions in energy service given price increases almost always result in
proportional reductions
in capital investment in end use technologies, such as vehicles, cooling units, heating units, etc. Ideally, you can probably im

**Answer** (by Antti-L):
> There
was also the general question about whether the reduced investments due elastic
demands may actually lead to a systematic underestimation of mitigation costs. I
am not sure whether that can be a serious problem, but below are just some basic thoughts
based on my understanding:
As far as
I can see, the ED approach used in TIMES works in the same way as other partial
equilibrium models
based on
maximizing
the total surplus
. For a single demand, the mechanism can be
illustrated by the following simplified graph:
Assume
that in the Baseline, the supply-demand equilibrium is established at p

### 13. Own-price elastic supply curve

**Asked by:** Viktor Racz | **Forum:** VEDA Support - Questions, Observations and Suggestions | **Thread:** [751](../../raw/forum/threads/751.json) | **Posts:** 61

**Question:**
> Dear All,
I would like to ask for your experience and a little help defining supply curve using own-price elasticity rather than different technologies.
The reason we would like to use this (more like a top-down approach) method is that our team is considering to model several industry sectors, however some of those are quite heterogeneous and therefore data intensive.
Moreover, due to the lack of

**Answer** (by Antti-L):
> >
To enable modal shift: COM_ELAST(r,t,TPPKM,ANNUAL,'N') = -2.
-->This defines the substitution elasticity between TPCAR and TPRAIL with 2, and activates the volume-preserving variant.
Yes, correct.
>
According to the 2nd sentence I can also define: COM_ELAST(r,t,TPCAR,ANNUAL,'FX') = -1 and  COM_ELAST(r,t,TPRAIL,ANNUAL,'FX') = -3
--> This defines component-specific substitution elasticities for TPCAR and TPRAIL.
Yes, correct.
>
Contrary to defining component-specific cross-price elasticity with COM_ELAST(r,t,TPCAR,ANNUAL,'FX'), I understand from the mentioned publication that they defined comp

### 14. Demand calculation

**Asked by:** meldoone | **Forum:** VEDA FE - Questions and Observations | **Thread:** [177](../../raw/forum/threads/177.json) | **Posts:** 60

**Question:**
> Hello,
I am trying to check the final demand calculation.
As it is written in the manual the demand is calculated:
DEM=K*Driver
elasticity
I am trying to check this calculation. Let's take for example TRL (DEM commodity) demand in the WEU region. So using the GDP as a driver and taking elasticity from "Demand_Alloc+series.xls" (ELASDM sheet)
Here is the link to the excel file with the calculations

**Answer** (by AKanudia):
> i can't reproduce your error locally; will take a little longer than normal.

### 15. TIMES-Macro-MSA and gdx behaviour

**Asked by:** Enya | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1494](../../raw/forum/threads/1494.json) | **Posts:** 58

**Question:**
> Hi!
I have been exploring the TIMES-Macro-MSA module recently and came across some odd behavior regarding the gdx file:
When I do a TIMES-Macro run
without
fixing a GDX file, the demand values (EQ_Combal) change a bit from the COM_PROJ due to the Macro interaction. (That is what I expected to see) However, for all demand commodities, the values only start to differ after 5 periods and I don't see 

**Answer** (by Antti-L):
> Thanks for the listing files.  They revealed that the CSA run is working fine, and with just a single master iteration, which is indeed as expected, because the model has only a single region and the discount factor harmonization is not requested.  However, the MSA run appears to require several master iterations, even though it appears to be the same Baseline (which I guess is explained by having no discount factor harmonization).  That would be still ok, but it appears that the algorithm fails due to LP model being
infeasible
in the fourth master iteration. That failure indicates that the LP

### 16. TSLV

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [131](../../raw/forum/threads/131.json) | **Posts:** 55

**Question:**
> I have been looking at the TSLV declaration of commodities which are not an ELC declared commodituy but are in fact ELC (like IOIELC in the EU model, because VEDA was giving en error (inconsistencies between BY template and Techrep). It seems that it is important to have some consistency between the commodity TSLV declaration and the process producing the commodity when a specific COM_FR is given 

**Answer** (by Antti-L):
> If you define your Demand commodities with a COM_FR (e.g. space heating), you
neither
need to define the demand commodities
nor
the demand processes at the DAYNITE level.
See the
TIMES Starter model
for example:  In the Starter model all the demands have a load curve, but the demands are ANNUAL and the demand processes are ANNUAL.  In that way the competing demand technologies serving the same demand will all see the same load curve, which is then reflected in the load profile of the input energy flows (unless the process is modelled as a storage). Subsequently, those input energy commodities 

### 17. Help with modelling CCS technologies for cement industry

**Asked by:** farzin | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1384](../../raw/forum/threads/1384.json) | **Posts:** 55

**Question:**
> Hello,
I am new to TIMES and seeking some advice in order to better capture certain dynamics in my representation of the cement industry. I aim to explore net-zero pathways for the cement industry by 2050, with an emphasis on fuel-switching flexibility, while giving the model an option for incorporating CCS for existing facilities to influence future investment decisions. Given the short timeline 

**Answer** (by Antti-L):
> >
However, since our model is a full energy system and all industries have stock instead of PASTI, I wanted to ask how this could change the results in the retrofit case compared to the latter?
The TIMES
retrofit
options can never create any new capacity. Therefore, if you use PRC_RESID for defining the phase-out of existing capacity, the capacity of a retrofit option will always be at most the original capacity.  For example, if you have defined a linear phase-out of the existing capacity, and at some year the remaining capacity is fully retrofitted, that retrofitted capacity can of course th

### 18. Issue with Elastic Demand

**Asked by:** Hesam | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1453](../../raw/forum/threads/1453.json) | **Posts:** 55

**Question:**
> Hi everyone,
I'm running a case with elastic demand, following all the necessary instructions. However, I'm encountering a strange issue where the demand for all energy services drops to zero by a certain point, though it seems reasonable in the periods beyond that. I've attached the settings for the elastic demand-related parameters, and I’m puzzled as to why demand would drop to zero, especially

**Answer** (by Antti-L):
> >
The model appears to be functioning reasonably well, as the prices follow at least a rational trend.
Ok, if you say so, you are the expert of your model.
>
Moreover, even with prices nearing zero, the demand should theoretically increase if I’m interpreting it correctly.
I was referring to the
Base prices
. If the Base prices do not behave well, elastic demands will not either. Reproducing the Baseline with elastic demands should not affect the demand levels; the solution should basically remain unchanged (very small OBJ change may however appear). But elastic demands are primarily meant to 

### 19. Demand elasticity

**Asked by:** Samaneh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [227](../../raw/forum/threads/227.json) | **Posts:** 55

**Question:**
> Hello,
I looked at demand elasticity scenario defined in Demo/SuppXLS folder. What are the 2 parameters, COM_VOC (MED variation of demand) and COM_step (number of demand growth) in TFM_INS table? I saw their definition in attribute table, but can you explain more about them?
Thank you,
Samaneh
~TFM_INS
TimeSlice
LimType
Attribute
Year
Cset_Set
AllRegions
UP,LO
COM_VOC
2001
DEM
0.15
UP,LO
COM_VOC
0

**Answer** (by Antti-L):
> Studying never ends; here is some more for you:
http://www.iea-etsap.org/docs/TIMES-Interpolate.pdf

### 20. Can least cost function be turned off for the BAU model

**Asked by:** rinahaiges | **Forum:** VEDA Support - Questions, Observations and Suggestions | **Thread:** [521](../../raw/forum/threads/521.json) | **Posts:** 55

**Question:**
> Hi....happy to join this forum today.
As a start in building my model, I wanted to gather all stock count of the existing power plants available up to the base year 2013, in which I wanted to let the model give me the results for emission, electricity generation, capacity and demand. I know that TIMES will automatically give the least cost solution, however, I was wondering is there a way for the 

**Answer** (by Antti-L):
> Dear Rina
I think you are being unfair towards Amit's suggestion.
Amit suggested that you would impose the observed utilization factors as availability factors for the power plants.  But you say that you tried that by changing the AFA to maximum 1.00 value!  In other words you did not try Amit's suggestion at all, and still you unjustly claim that "
it didn't work
". Setting AFA to 1.00 would not make sense, as imposing such AFA factors would not have any impact on the model results (the maximum availabilities are 100% already by default).
It should be obvious that some technologies may not ap
