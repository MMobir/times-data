---
type: faq
title: "FAQ: User Constraints"
aliases: []
tags: [faq, user-constraints]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: User Constraints

This page collects frequently asked questions and expert answers about **User Constraints** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 156
**Top Q&As shown:** 20

---

### 1. Modeling a vehicle eff. target w/ user constraints

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [54](../../raw/forum/threads/54.json) | **Posts:** 293

**Question:**
> I'd like to model the US CAFE fuel economy standards out to 2016, and to this end, I have created the attached scenario file with a couple user constraints - one for light-duty cars and another for light-duty trucks.  However, I'm not 
sure if the constraints are doing exactly what I want.
The fuel economy constraints 
should only apply to *NEW* vehicles 
(i.e., an increasingly higher standard for

**Answer** (by Antti-L):
> Commenting on these VEDA-specific settings should be best left to Amit, but as far as I know, one had really better use the "0" setting for "Generate Vintage Bounds", unless you are actually manually introducing technology vintages in your model (by introducing separate processes for each vintage), and have given them names ending in year numbers.  Only in that case you can make use of the automatic generation of vintage bounds, which depends on the process names with year numbers. However, if you have some process names ending in numbers but not being intended to be interpreted as vintage yea

### 2. Problem with version 4.3.33

**Asked by:** JoaoGouveia | **Forum:** VEDA FE - Questions and Observations | **Thread:** [40](../../raw/forum/threads/40.json) | **Posts:** 287

**Question:**
> I have an error with the new version 4.3.33 that didn't occurs in the early version, and using exactly the same scenarios.
We identify that the problem is in the sysettings, generating the error $338:
"**** LINE   1870 BATINCLUDE  C:\Veda\Veda_FE\GAMS_WRKTIMES\XBASE.dd
**** LINE     97 INPUT       C:\Veda\Veda_FE\GAMS_WRKTIMES\conserva.RUN
128170   -
****     $338"
When we put the sysetings in dif

**Answer** (by Antti-L):
> It looks like you may be using the old-fashioned ADRATIOs a la MARKAL, and while VEDA now generates the UC_N name entries, it apparently generates '-' as the UC_N name for those old-style ADRATIO constraints, when the default interplolation options are applied in SysSettings.
I can recommend to start using the new UC_T facility for defining user constraints.
However, I understand that the NEEDS models and other models using the old style constraints are still in widespread use and would benefit from having this bug fixed.
Antti

### 3. Life Update

**Asked by:** Vladimir | **Forum:** VEDA FE - Questions and Observations | **Thread:** [91](../../raw/forum/threads/91.json) | **Posts:** 200

**Question:**
> Good morning for All.
I want change attribute "Life" in technology that define in base scenario (BASE.dd file).
I change it by "Scenario" file.
This file generate dd file:
"
$ONEMPTY
$ONEPS
$ONWARNING
$SET RUN_NAME 'BAU'
$SET SCENARIO_NAME 'CHANGE_LIFE'
SET TOP_IRE
/
/
SET UC_N
/
/
PARAMETER
NCAP_TLIFE ' '/
RUS.2005.HETCOA 10
/
"
But there is no diffrence after use it.
Could You find my error.
Tha

**Answer** (by AKanudia):
> This is a good place to expose two VEDA conventions that play a role here:
VEDA prohibits investment in all techs that are defined in B-Y templates (except for sectors "SUP" and "UPS") that have a RESID/Stock specification.
VEDA generates a zero-point for PRC_RESID if LIFE has been explicitly specified
AND
RESID has been specified for only one year.
And, like I have mentioned in the tips section as well, you are strongly encouraged to use the browse facility of VEDA to look at technology specifications. You will see NCAP_BND(UP)=2 for year=0 in that view, which you don't see in Excel. See the 

### 4. start year with different period definition

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [63](../../raw/forum/threads/63.json) | **Posts:** 160

**Question:**
> I have a problem with my model when running with different periods definition because of a lower bound on electricity heating in residential sector. The model is calibrated for 2005 and the new technologies for electric heating start in 2006. When I run the model with as milestone year 2005 (1year) 2006(2years) 2010(5years) ,everything goes fine but when I run with 2005 (2years) 2010(7years) I get

**Answer** (by Antti-L):
> Yes, according the original design in TIMES, PRC_NOFF considers the technology unavailable in a period whenever the milestone year of the period is inside the OFF range. But since version v3.0.1 you have been able to change the meaning of PRC_NOFF, such that it will consider a technology unavailable in a period only if the full period is covered by the OFF range.
You can change the meaning of PRC_NOFF by using the new parameter G_OFFTHD(y)=1, where y stands for the year, starting from which the interpretation should be changed. The year index was included in the parameter, because normally one

### 5. Modeling investments and mandates

**Asked by:** qzaus | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [966](../../raw/forum/threads/966.json) | **Posts:** 75

**Question:**
> I am interested in modeling some mandates and investment policies. For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates? Should I also modify corresponding demands to reflect these changes? Thank you!

**Answer** (by Antti-L):
> > [(06-03-2021, 01:00 AM)qzaus Wrote:] For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates?
I have been using market share constraints, for the share of EVs in the total sales of new cars, in addition to market share constraints for EVs in the total passenger car travel demand.  I think at least the former could be a "real-world" policy mandate. But anyway, almost any policy requirement that can be described by convex programmi

### 6. UC_CO2 Trading

**Asked by:** JozefO | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1018](../../raw/forum/threads/1018.json) | **Posts:** 70

**Question:**
> Hello guys.
I m thinking about creating Emissions (CO2) trading system - ETS in TIMES. Here is an example.
Tech_18
produced (ENV) Commodity
CO2_18
in 2018, 8.5 kT CO2 per annum. Free emission allocation (FEA) for years 2018, 2020, 2025, 2030 ... are
2018 = 8.7 kT FEA
2020 = 8.2 kT FEA
2025 = 7.8 kT FEA
2030 = 7.4 kT FEA
Prices for kT/CO2 are:
2018 = 0.008 mEuro/kT
2020 = 0.013 mEuro/kT
2025 = 0.01

**Answer** (by Antti-L):
> But I already gave you a working example, didn't I?
An emissions trading system only sets a cap (bound) on the total amount of emissions that can be emitted by the installations covered by the system.  That cap corresponds to the
total amount of allowances
, whether they are auctioned off or allocated for free, and the allowances can subsequently be traded.
In your case, I have understood that your model does not include the whole ETS system, but only a single participating country exposed to exogenous prices of emission allowances, and therefore I suggested to use an exogenous trade process (

### 7. simulating technology economies of scale

**Asked by:** cyang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [219](../../raw/forum/threads/219.json) | **Posts:** 66

**Question:**
> Hi,
first post on the forum.  I have a few questions about different potential methods for simulating economies of scale for a technology.
1) Is it possible to assign a fixed cost to a technology (i.e. an absolute value $X million dollars) irrespective of capacity rather than a cost that is proportional to capacity ($X million per PJ capacity)?
2) Is there a way to set or enforce a minimum size fo

**Answer** (by Antti-L):
> Chris:
You are right: my hypothesis was too hastily formulated.
I just run a demo model using your continuous capacity development as a demand for both a process with continous capacity additions and a process with discrete capacity additions (3.5 and 5.5). The results were as shown below:
---- VAR VAR_NCAP  New capacity of a process
LOWER          LEVEL          UPPER         MARGINAL
REG.2007.CONTINUS          .              .            +INF            0.2424
REG.2007.DISCRETE          .              .            +INF            0.7107
REG.2010.CONTINUS          .              .            

### 8. UC_Growth seed value violated

**Asked by:** ach | **Forum:** VEDA FE - Questions and Observations | **Thread:** [826](../../raw/forum/threads/826.json) | **Posts:** 66

**Question:**
> Hello,
Facing issues similar to the ones mentioned in this thread:
http://forum.kanors-emr.org/showthread.php?tid=354&highlight=UC_RHSRTS
, I checked the capacity deployment associated with a rapidly growing technology that should be restricted. I found that the model, whenever it deploys one of the new technologies that have an existing capacity of zero, will deploy a large amount said technology

**Answer** (by Antti-L):
> > [(23-03-2020, 10:30 PM)ach Wrote:] I'm still seeing violations of the seed value. My UC_Growth and some VEDA BE output screenshots are attached. Could you please suggest what's happening? Hopefully I've made all the suggested changes to UC_Growth. I'm not sure about my use of U_CAP~0 and interpolation rule 11.
Well, for one thing, you are still deliberately choosing the (T, T+1) variant for the dynamic growth constraints, as I have tried to explain.  As mentioned several times earlier, you should define GROWTH on the RHS side if you would like to use the (T, T−1) variant, but it seems you do

### 9. TIAM - GHG constraint

**Asked by:** srchlela | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1177](../../raw/forum/threads/1177.json) | **Posts:** 65

**Question:**
> Dear all,
I have a UC_COMNET on the GHG commodity that sets it to zero in 2050 for the EEU+WEU (please see the attached).
In the results, the Var_Fout for GHG goes to zero, whereas all the emissions commodities (the CO2, CH4, and N2O) do not.
They are agreggated as in the attached photo.
Then I tried a UC_COMNET also for EU on the commodities. Some go to zero in the CO2 but non in CH4 or N2O.
What

**Answer** (by Antti-L):
> Recall once again the balances:
VAR_COMNET − Imports + Exports  =  Production − Consumption
Hence, if you make a constraint bounding  (VAR_COMNET − Imports + Exports) to zero, then (Production − Consumption) will also be bounded to zero, and that expression is the regional net emissions (unless you have dummy imports for the constraint).
>
In the results the COMNET for GHG for WEU remains positive (the sum EEU+WEU as well)
If you bound the net emissions of EEU+WEU to zero, then VAR_COMNET for (EEU+WEU) can be positive, if there are net imports of those emissions into EEU+WEU.  So, can you conf

### 10. UC not working

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

### 11. Help with user constraint

**Asked by:** newbie1 | **Forum:** VEDA FE - Questions and Observations | **Thread:** [664](../../raw/forum/threads/664.json) | **Posts:** 65

**Question:**
> Hi,
I'm trying to implement a version of the RFS where in 2010 125 PJ if advanced fuels are produced, in 2015 724 PJ if advanced fuels are produced, 2020 1976 PJ if advanced fuels are produced and in 2025 125 PJ if advanced fuels are produced. Also in 2010 1581 PJ if conventional fuels are produced, in 2015 1976 PJ if conventional fuels are produced, in 2020 1976 PJ if conventional fuels are produ

**Answer** (by Antti-L):
> I cannot see anything wrong in your ~UC_T table. In fact, I just tested an almost identical constraint myself, and it worked perfectly: The total production of the commodities included in the constraint was forced to be at least the amount defined by the UC_RHSTS.
Thus, for my part I can confirm that
my constraint is working
.
Maybe you could first explain what you mean by saying "but is not working"?  Are you saying that these constraints are not getting generated at all, or that they are not formulated as you expected, or something else? Can you see VAR_COMPRD reported for the commodities (C

### 12. Results of UC_Growth are not matching with given constarint

**Asked by:** Anjali | **Forum:** VEDA FE - Questions and Observations | **Thread:** [830](../../raw/forum/threads/830.json) | **Posts:** 65

**Question:**
> Hello,
I am using the Scen_UC Growth user constraint for the capacity growth of bio-mass plants in my model.
Image of input file is:
And the result image is :
Can anyone please help me to troubleshoot the problem why capacity growth is higher than the given 1% limit in constraint file.
New capacity is given to be added after yr. 2019 in this case.
Thank You

**Answer** (by Antti-L):
> Yes, you have understood quite correctly.  You can of course define any values (any trajectory) for the additional capacity per period instead of the constant -1 (UC_RHSRTS).
Denoting by Growth(t) the growth multiplier (defined by UC_CAP(LHS)), you are defining a constraint with the following formulation (constraint type = LO):
VAR_CAP(t) × Growth(t)  ≥  VAR_CAP(t+1)×UC_CAP(RHS) + UC_RHSRTS(t)
As you can see, the value 1 under column UC_CAP~RHS is applied as the multiplier of VAR_CAP(t+1), and for a growth constraint (T,T+1) the value 1 is normally used, because you want to constraint the grow

### 13. How to set UCs for the share of power generation capacity?

**Asked by:** Xin Wang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [530](../../raw/forum/threads/530.json) | **Posts:** 64

**Question:**
> Dear all,
Have you ever tried to set UCs for the share of power generation capacity? For example, I'd like to set an upper bound of 30% for the power generation capacity based on coal in 2050, a lower bound of 40% for the power generation capacity based on wind or solar in 2050 and a fixed share of 20% for the hydro power generation capacity.
Thanks in advance for your help!
Best,
Xin

**Answer** (by Antti-L):
> Ok, thanks for your efforts in helping to investigate your problem.
Unfortunately, I was not able to identify any clear issue from the Browser screenshots.
However, I can demonstrate that the constraint is working by showing results from the DEMO model, using exactly the same way of defining the constraint as I have shown earlier.  The capacity results are show in the table below:
As you can see, the share of hydro capacity in the total electricity generation capacity is at the upper bounds defined by the constraint in all periods 2015-2050. The constraint is thus working fine. And I have veri

### 14. Issue with UC on cum subsidies for period of years

**Asked by:** janis | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1431](../../raw/forum/threads/1431.json) | **Posts:** 63

**Question:**
> Dear,
I have a problem with cumulative subsidies over a period of a few years. I also know that there have already been discussions on similar topics here!
What am I doing wrong?
Please see the steps for test case below.
So:
- subsidies are defined
-
UC (I am try also
other different ways inc.
2020-2022 etc.)
- in VEDA 3.1.2.0 it looks like
- running model UC generated for whole time period 2020-2

**Answer** (by janis):
> Dear,
I have a problem with cumulative subsidies over a period of a few years. I also know that there have already been discussions on similar topics here!
What am I doing wrong?
Please see the steps for test case below.
So:
- subsidies are defined
-
UC (I am try also
other different ways inc.
2020-2022 etc.)
- in VEDA 3.1.2.0 it looks like
- running model UC generated for whole time period 2020-2030:
EQE_UC(UC_Max-Wind-Subsidy CUM-B)..  - 10*VAR_ACT(LATVIA,2020,2020,
EWINOFS010,S-D) - 10*VAR_ACT(LATVIA,2020,2020,
EWINOFS010,S-N) - 10*VAR_ACT(LATVIA,2020,2020,
EWINOFS010,S-P) - 10*VAR_ACT(LATV

### 15. reporting UC created by VEDA-BE?

**Asked by:** Sebastien | **Forum:** VEDA BE - Questions and Observations | **Thread:** [358](../../raw/forum/threads/358.json) | **Posts:** 63

**Question:**
> Hi,
I have some UserConstraints in VEDA-BE that don't exist in VEDA-FE: IMP, EXP, LUMPINV, INSTCAP (in the two lattest's case, associated with Cap_New Attribute).
What bothers me is that I do not seem to have activated any lump investment switch, and those "user constraints" do not appear in VEDA-FE. They show up in VEDA-BE when I somehow force massive investment in renewable energy sources throug

**Answer** (by Antti-L):
> This is not actually a VEDA issue.
The dimensions of the reporting parameters are defined in the file Times2Veda.vdd.  Initially (in 2004), they appear to have been defined to be the following:
[Dimensions]
Attribute        attr
Commodity        c
Process          p
Period           t
Region           r
Vintage          v
TimeSlice        s
However, then someone thought that it would be nice to have the user constraint marginals reported as well.  Consequently, in 2006 the new dimension  UserConstraint  (uc_n) was added at the end.
Nonetheless, over time there were further requests for new rep

### 16. UC to Cumulativly Constrain TOTCO2e

**Asked by:** JGlynn | **Forum:** VEDA FE - Questions and Observations | **Thread:** [396](../../raw/forum/threads/396.json) | **Posts:** 63

**Question:**
> Hi All
I wonder can you help me figure out a user constraint for combining TOTN2O + TOTCH4 with TOTN2O in ETSAP-TIAM to give a CO2 equivalent commodity TOTCO2e of all three GHGs?
I have used scenarios with cumulative constraints of specified individually on CO2, N2O and CH4 (below).
However, I'd like the added flexibility of combining TOTCO2, TOTN2O, TOTCH4 using their warming potentials (1, 310, 

**Answer** (by Antti-L):
> James' example shows illegal use of a year range for UC_COMNET. UC_COMNET accepts only single years (and UC_RHS does not accept any year indexes). If you want to use the UC_COMNET approach, you need to define the Period range by UC_Sets: as shown earlier in the thread:
UC_Sets:T_S: 2020,2100,0
Here, the final ",0" is an "interpolation" option, such that all periods between 2020 and 2100 are included.
Alternatively, you could set UC_Sets:T_S: empty, which means that all periods are included.
Alternatively, you could set UC_Sets:T_S: empty, and use UC_CUMCOM with an exact year range.
Alternative

### 17. User Constraint not Binding

**Asked by:** slevinson | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1213](../../raw/forum/threads/1213.json) | **Posts:** 62

**Question:**
> Hi,
I'm working on developing a  Regular Scenario with user constraints to limit CO2 emissions. This is modeled using the EPA US 9 Region TIMES model. I have attached a sheet that shows a sample of the constraints that I am trying to use. However when running the model, I get results that exceed the user constraints.
In 2050 the constraint limits the sum of ELCCO2, TRNCO2, and INDCO2 to 800, howev

**Answer** (by Antti-L):
> @Victor:
>
I would like to write a veda table to deactivate a list of user constraints defined in a different regular scenario.
>
I think turning lim_type from UP to N for the selected uc_n would work but I did not managed to find the proper declaration in veda.
>
I can see the potential for a user who wants to define in bulk constraints and then only activate subset of these constraints for example with the parametric scenarios feature in veda.
I tried to see if a simple mechanism could be added into TIMES for this purpose, and arrived at a tentative implementation, based on using an interpol

### 18. trade bound

**Asked by:** xiao.li8@mcgill.ca | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1515](../../raw/forum/threads/1515.json) | **Posts:** 62

**Question:**
> Hi,
Sorry just a quick question;
how do I limit the activity bound for a bi-trade flow: e.g., from A state to B is 10PJ, while revert is 0.
Best,
Xiao

**Answer** (by Antti-L):
> Ok, I guess a new attribute could be implemented for it in TIMES.
But could you first clarify what that FLO_BND('IMP_ELC_DEU','ELC-HV-on','DAYNITE') = 150 you defined is in fact meant to mean?  Do you mean that for each DAYNITE timeslice the flow bound should be
150
GWh, regardless of the timeslice length?  So, for example, if one timeslice has a length of 1 hour, and another has a length of 100 hours, the maximum power rate level would be 150 GW for the 1-hour timelice but only 1.5 GW for the second, 100-hour timeslice?  I think such would usually not make much sense, and it would make the ef

### 19. UC_FLO ignored by TIMES for IRE processes needing UC_IRE

**Asked by:** NeilGrant | **Forum:** VEDA FE - Questions and Observations | **Thread:** [715](../../raw/forum/threads/715.json) | **Posts:** 62

**Question:**
> Hi all,
I am still relatively new to TIMES - and am using the global TIAM model. I am trying to introduce some constraints to China, to constrain the total primary energy supply / final energy. I have attached an example Excel spreadsheet below with the two example constraints.
The first (Sheet1) attempts to enforce a 10% share of gas in TPES for China in 2020.
The second (Sheet2) is meant to limi

**Answer** (by Antti-L):
> Thanks for clarifying a bit your problem.
Unfortunately, I still am not quite able to see how you are modeling this, and what the issues actually are. For example, I can see in your results capture that you have processes TRDEN_Sorlige_UK, TRDES_Sorlige_UK and TRDN_Sorlige_NO2.  I assume these three are now trade processes?  But why do you have
imports of ELC-HV
into the Sorlige region (through TRDES_Sorlige_UK)?  I thought the Sorlige region was supposed to be an offshore region
exporting
wind production, and so why would it be
importing
electricity? Is the imported electricity necessary for 

### 20. how to stop 2050 emissions go negative

**Asked by:** UKTM User | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1063](../../raw/forum/threads/1063.json) | **Posts:** 61

**Question:**
> Hi, I'm having trouble stopping 2050 emissions going negative.
I'm not sure why it happens as it would be more expensive to go negative than being zero.
I have put an additional constraint to restrict it to be zero but it doesn't work.
I'm wondering if I could get some help on this if possible?
Thank you

**Answer** (by Antti-L):
> Ok, thanks for the RUN file.
I was surprised by actually being able to get a feasible solution with your RUN file and your Cplex.opt settings.  I note that you have disabled crossover, which means that the solution may not be very reliable. Specifically, in your model instance, with the constraint fixing the 2050 value of VAR_COMNET(GHGTOT_MT) to zero, the commodity balance of GHGTOT_MT is reported by GAMS to have the following values in the solution (LO,Level,UP,Marginal):
'UK','2050','GHGTOT_MT','ANNUAL',0,-33.3923741920795,0,-260561593.702034
As you can see, this commodity balance is
infeas
