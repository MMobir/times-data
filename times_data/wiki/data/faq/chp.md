---
type: faq
title: "FAQ: Chp"
aliases: []
tags: [faq, chp]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Chp

This page collects frequently asked questions and expert answers about **Chp** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 36
**Top Q&As shown:** 20

---

### 1. Condensing turbine

**Asked by:** JozefO | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1093](../../raw/forum/threads/1093.json) | **Posts:** 75

**Question:**
> Hi guys, i would like to ask how to build up a Condensing CHP in my model for steelworks.
My questions are:
1. Is it good approach to have BOILERS producing only energy carrier "DIRECTSTEAM" which input to other processes and also as a "fuel" for Condensing turbine producing ELECTRICITY and another kind of STEAM "INDIRECTSTEAM" with different parameters in contrast with "DIRECTSTEAM" ? It is neces

**Answer** (by JozefO):
> > [(08-10-2021, 10:08 PM)Antti-L Wrote:] You have not understood it well.  Please read the documentation, section 4.1 Combined heat and power.NCAP_CEH absolutely must be specifiedwith a reasonable non-zero value ifNCAP_CHPR(UP)is used.  This is so because for the flexible operation range, the efficiencies are only valid forone pointon the constant fuel line, and if you do not specify NCAP_CEH or set NCAP_CEH=0, then the efficiency would be constant on that line, which makes no sense.You claim in the Excel file that the process should consume 23.20701 units of input in 2018.  But that would be 

### 2. How do I add additional element to prc_grp?

**Asked by:** kristofferand | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1206](../../raw/forum/threads/1206.json) | **Posts:** 74

**Question:**
> [font=Monaco, Menlo, Consolas, "Courier New", monospace]Hi,
I am looking for some help and guidance in terms of how to add an additional element to the prc_grp (proces group) in a TIMES model. As I understand the following groups are available by default:
IRE,Inter-region exchange (IMPort/EXPort)
XTRACT,Extraction
RENEW,Renewables (limited)
PRE,Energy
PRW,Material (by weight)
PRV,Material (by volu

**Answer** (by Antti-L):
> As you posted this question on the VEDA 2.0 Sub-Forum, I assume that you need to see the additional process groups in VEDA2.0, for easier creation of results reporting tables.
That can be easily accomplished by adding process sets in VEDA2.0:
Go to
Tools → Sets → Sets Editor
, and create the new sets.
-----
However, if you would like to add such sets also in the TIMES code, such that they appear in the GDX file TIMES produces, that kind of adjustment would basically no longer be related to Veda. Such is also possible, but would unfortunately require
code changes
, and if you for some reason wo

### 3. Update a LIFETIME of technology by Scenario file ?

**Asked by:** JozefO | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [942](../../raw/forum/threads/942.json) | **Posts:** 71

**Question:**
> Hello guys pleas help me. I have an Power plants, CHP and HP. Every single facility has in BASE scenario LIFE (Lifetime
40
years). Now i need to change lifetime of every of them.
I m using Parametric scenario
~TFM_UPD
for change this value, but it´s not working.
Could you give me advice please ?
Thak you

**Answer** (by Antti-L):
> > [(29-01-2021, 02:08 PM)JozefO Wrote:] I did what Antti said. I used ACT_BND = 0 for that technology CHPF75, for years, 2030 35 40 45 50. And New technology appeared in final result.
No, you did not actually do what I said. I suggested to define ACT_BND for a single year and use an interpolation option.  It is much better practice that way.
> [(29-01-2021, 02:08 PM)JozefO Wrote:] Just for curiousity, if i add a column with attribute STOCK and actuall amout of fuel consumption for that fuel technology CHPF75, then it is possible to use LIFE to stop working ?
If you mean to use the TIMES attrib

### 4. Divergent LCOE and marginals

**Asked by:** Lukas Novak | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1222](../../raw/forum/threads/1222.json) | **Posts:** 65

**Question:**
> Dear all,
recently I came across a strange observation regarding the LCOE value. I had a feasible model and tried to vary the CHPR value and see how the LCOE changes. Few changes went normal, but then as I reached certain value of CHPR (far from the counted limit), LCOE as well as all  marginals raised to the maximum. As I continued to vary CHPR and approached to the counted limit, LCOE and the ma

**Answer** (by Antti-L):
> >
"Solver did not provide marginals for model TIMES"
Aha... that is of course crucial here.  I think you didn't mention that before.
That message means that when Cplex runs the final solve (by fixing the integer variables), the fixed problem is reported to be infeasible. Your log file also shows that as a remedy, Cplex suggests that you could use the option "relaxﬁxedinfeas 1".
The problem usually points to a poorly scaled model, and so you could also try and fix it by properly scaling your model. But as a first attempt, you could test with a few additional Cplex options like "numericalemphasi

### 5. ACT_EFF and CHP configuration

**Asked by:** AdvisorDK | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1565](../../raw/forum/threads/1565.json) | **Posts:** 64

**Question:**
> Dear Forum,
I configured a CHP process (electricity-driven) using
ACT_EFF
for the PG commodity - as suggested in the VEDA documentation-, but after running the model I get the warning:
> [Quote:] Found CHP processes with PG commodity efficiencies – unsupported
When I switch to the traditional
EFF
attribute, the warning disappears and results (annual production, system cost) look unchanged.
Besides

**Answer** (by Antti-L):
> >
I am right in my understanding that if you use ACT_EFF to model CHP and want to avoid the warning "Found CHP processes with PG commodity efficiencies – unsupported"  in the QA_CHECK.LOG then you can add "other_indexes" in the ~FI_T table? I.e.:
Yes, you can specify the input commodity group for ACT_EFF in several ways:
In the value column header:  e.g.: ACT_EFF~ACT, ACT_EFF~NRG, ACT_EFF~NRGI, ACT_EFF~ELCWPE
In a Comm_IN column (on a row where Comm_Out is empty), e.g.: ELCWPE
In a CommName column, e.g.:  ELCWPE
In a CommGrp column, e.g.: ACT, NRG, NRGI, ELCWPE
In an Other_Indexes column, e.g.

### 6. Ratio between output commodities

**Asked by:** seb | **Forum:** VEDA FE - Questions and Observations | **Thread:** [165](../../raw/forum/threads/165.json) | **Posts:** 61

**Question:**
> Hello,
I got a question maybe
someone can help me. I would like to model a process that produces two different
output commodities with a defined ratio. None of these commodities is ELC. I
could still use a CHP process, but would have to define one commodity as ELC (in
order to use CEH or REH) but I would like to avoid this option.
Alternatively, I tried
defining a PRE process, unfortunately, I do 

**Answer** (by Antti-L):
> I am sorry
that you still seem to be stuck with trying to use the standard NCAP_AFAC,
although I have tried to explain that it is not the right approach for accomplishing
what you want.
I have
already explained that when using the standard NCAP_AFAC, the combined
availability factor is derived as a linear combination of the outputs. I have
also noted that this does not work well for technologies like heat pumps, for
which the combined ANNUAL availability factor cannot be derived that way, but
it would reach its maximum value at some point
in the middle
of the range of possible outputs mixes.
I

### 7. Need help correcting CHP efficiency.

**Asked by:** smriti_ms | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1368](../../raw/forum/threads/1368.json) | **Posts:** 55

**Question:**
> Hello,
We have modeled a H2-powered fuel cell technology as a combined heat and power (CHP) process in a TIMES case. We want it to produce both- heat and power and specified the attributes as in the attached scenario file.
This technology should exhibit an electrical efficiency of ~52% and heat efficiency of ~37%. Hence a combined efficiency of ~89%. However, we are only getting an efficiency of 7

**Answer** (by Antti-L):
> >
After making the changes suggested by you, I re-ran the NetZero case and TIMES is not deploying the technology at all. Increasing efficiency from 76% to 89% should make the technology more attractive, not less, right?
Yes, increasing the efficiency from 76% to 89% should make the technology more attractive. Indeed, I checked that the efficiency was correct after my changes.
>
additionally changed the CAP2ACT to 1
Ok, then your costs per activity would be much higher. Would that explain your zero deployment?
>
I was meaning to define efficiencies in terms of the input itself - 1PJ input gives

### 8. PCG for CHP plants

**Asked by:** Anna (AKR) | **Forum:** VEDA FE - Questions and Observations | **Thread:** [663](../../raw/forum/threads/663.json) | **Posts:** 55

**Question:**
> D
ear Veda forum
I have problems with some of the
CHP plants in my model (CHP in which
CEH=1, i
.e. the activity and capacity represents the total capacity (electricity + heat)).
For some of the CHP, I receive the bellow “VDA_Flop_LogData” message, in which the PCG members seem to be missing/deleted.
T
he strange thing is that only some of the CHPs show up in the list below, while other similar CH

**Answer** (by Antti-L):
> Ok, I tried myself with similar processes defined in the DEMO model.
I can also see the VDA_Flop_LogData messages, but these are only warnings.  You appear to be using the Output~ELCMED and Output~HETLAR just for defining the
topology
, which I would say is not really recommended, but I can see it does seem to work!
So, I think that for that part you have nothing serious to worry about. But because you say that the processes generate output without having any input, I suspect that the IND* input commodities for these processes may perhaps not be defined, either in that template, or in SysSetti

### 9. CHPR~FX and Dummy Import

**Asked by:** JozefO | **Forum:** VEDA BE - Questions and Observations | **Thread:** [910](../../raw/forum/threads/910.json) | **Posts:** 55

**Question:**
> Hello guys, here is my model.
I have Combined heat and power plants (CHP) which produce ELECTRICITY and HEAT.
And problem is that, production of HEAT is unstable and its throwed to DUMMY import.
Here is Result from VEDA Back- End. And also my VT file.
What is wrong ?
Thank you very much

**Answer** (by Antti-L):
> Yes, CHP stands for Combined Heat and Power, and in TIMES models CHP processes must have an
electricity
output, if you want to use the CHP attributes.  You seem to have no electricity commodities in the model.

### 10. CHP with two electricity outputs

**Asked by:** janis | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1443](../../raw/forum/threads/1443.json) | **Posts:** 50

**Question:**
> I would like describe in the TIMES/VEDA combined heat and power plants (CHP) with two electricity outputs. CHP is modelled as a flexible pass-out turbine system by specifiing NCAP_CHPR and -1<NCAP_CEH<0. If it is possible then what steps should be followed to specify two elc outputs?

**Answer** (by Antti-L):
> I am sorry but I could not see the process topology in your pictures, and so I don't know what you have in the topology and what is the
PCG
. And I cannot see whether LVGREL and LVGBIOSLD are indeed ELC.
I was suggesting to do what I said in my post: Add a new dummy output flow (of type NRG, and LimType N).  It should be automatically in the PCG as well, if your PCG is the default PCG or NRGO. And then just define PRC_FOFF(reg,prc,'DUMNRG','ANNUAL','BOH','EOH'), to disable this dummy flow.  The two electricity outputs must, of course, also be defined of
type ELC
.
>
Now, we’d like to add a sec

### 11. CCHP

**Asked by:** nadiracm | **Forum:** VEDA FE - Questions and Observations | **Thread:** [839](../../raw/forum/threads/839.json) | **Posts:** 40

**Question:**
> Dear All,
I put a CCHP (Combined Cooling Heating and Power) system on SubRES_New-CCHP in my model, but I little bit confused about how TIMES can calculate the joint cost for each commodity. Can someone please explain this to me? Thank you.

**Answer** (by Antti-L):
> Ok, so you are trying to use the Backpressure mode example in the TIMES Demo template no. 009 for modelling a CCHP process.
As explained in the documentation, if CEH is zero or missing as in that example, the activity represents the electricity generation and the capacity represents the electrical capacity. So, the parameter EFF=0.4 in the example represents the electrical efficiency.  And the ratio of heat produced to electricity produced is defined by a fixed CHPR=1.2, and therefore the "heat efficiency" and the total CHP efficiency are both then implicitly defined. The total efficiency is E

### 12. Use PRC_ACTFLO instead of INPUT/OUTPUT/FLOP for PCG members

**Asked by:** janis | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1468](../../raw/forum/threads/1468.json) | **Posts:** 35

**Question:**
> After installing VEDA2 v4.0.0.0 and importing the model templates, I encountered a message stating that the VDA_FLOP parameter for secondary commodities would not be imported. The message read:
“Info – records deleted in Step 2”
with the explanation:
“Use PRC_ACTFLO instead of INPUT/OUTPUT/FLOP for PCG members.”
I think it is related to VEDA forum thread
https://forum.kanors-emr.org/showthread.php

**Answer** (by Antti-L):
> >
”Use PRC_ACTFLO instead of INPUT/OUTPUT/FLOP for PCG members.”
If you see the warnings issued for Input / Output =1, I think such warnings are, in fact, superfluous. VEDA does have the old convention that Input / Output =1 can be used for creating process topology (without Comm-IN / Comm-OUT), and so it should be perfectly ok to use those for PCG members as well. But I guess your warnings are probably for some other flows with Output<>1? Such warnings would signify likely modeling errors, related to outputs meant to be "secondary" but mistakenly included in the PCG.
Any secondary outputs (wh

### 13. out of memory error

**Asked by:** huichenpku | **Forum:** VEDA FE - Questions and Observations | **Thread:** [405](../../raw/forum/threads/405.json) | **Posts:** 35

**Question:**
> Dear all,
The  error  reported as "7 Out of memory" occured, and I dont' know why it happened.
Attached is the error picture and my CHP process.
uploads/271/Error.png
uploads/271/VT_GD_CHP_V01.zip

**Answer** (by Antti-L):
> @huichenpku
: I happened to look at the file VT_GD_CHP_V01.xls,
and I noticed that you have now defined the CHP process efficiencies by using
differing
commodity-specific efficiencies on the
outputs
, ELC and HET.
You should be aware that, in general, the
CHP attributes have been designed to work correctly only when the process
efficiencies are defined either for the process shadow input group as a whole
(EFF/ACT_EFF(CG)), or on specific input fuels (CEFF/ACT_EFF©).
In particular,
modeling flexible CHP operation correctly with the CHP attributes is
not possible
if you are defining
differing CE

### 14. UC_table

**Asked by:** AkramS | **Forum:** VEDA FE - Questions and Observations | **Thread:** [717](../../raw/forum/threads/717.json) | **Posts:** 35

**Question:**
> Hi,
I want to add a user-constriant on total production of some of technologies (PSET: HPL_EH), which belong to a larger group of technologies (HPL,CHP). All of these technologies produce one common commodity (HCE). Enclosed please see the figure and the ~UC_T table. The constriant doesn't work and I get dummy emports. I need to say that I have ealier added a contriant to the model to be sure that

**Answer** (by Antti-L):
> If you get dummy imports only when using this constraint, your constraint is infeasible (it cannot be satisfied without dummy imports). Have you checked the constraint parameters in the VEDA Browser?  Can you see there exactly the UC_COMPRD and UC_FLO parameters you have intended to have?  If they are all as intended, but you still get dummy imports due to the constraint, then the problem is in your formulation, and not in the UC specification itself. If the dummy imports appear only in some years, e.g. 2016, your constraint may just be too tight for that historical year.
Looking at your attac

### 15. Regarding IRE set

**Asked by:** Pernille.S | **Forum:** VEDA BE - Questions and Observations | **Thread:** [825](../../raw/forum/threads/825.json) | **Posts:** 35

**Question:**
> I observe that the IRE set also constains RNW processes. Is there a reason for this? And does this indicate that somethings is wrongly defined in our model?
Pernille

**Answer** (by Antti-L):
> The set IRE contains all trade processes, i.e. those that have their topology defined by TOP_IRE, and are therefore inter-regional exchange processes. So, I guess your "RNW" processes are such trade processes?
Basically, TIMES does not know which of these trade processes are real trade processes and which are meant to be representing "primary energy extraction", like I assume your "RNW" processes are.  But of course, we could use an additional process characterization (e.g. the predefined "XTRACT") for separating real trade processes from "primary energy extraction" processes.
If that would he

### 16. maximazing income of produced commodity

**Asked by:** kxxu | **Forum:** VEDA FE - Questions and Observations | **Thread:** [297](../../raw/forum/threads/297.json) | **Posts:** 30

**Question:**
> In my model I've got these processes: 2 chp with back-pressure turibine, 2 chp with condensing turbine, 3 heat plants and heat storage. I want to maximize income of produced electricity, shifting producing more heat at night(condensing turbine) to produce more electricity at day(when prices are much higher), in chp with back-pressure turbine produce more elcticity and heat at day. I've got market 

**Answer** (by Antti-L):
> To maximize costs, yes, it should be possible in several different ways, although I have never tried it.
As this is the VEDA Forum, I describe one way of doing it with the tools available in VEDA-FE:
Create a new scenario, where you use a
~TFM_UPD
table to update all cost parameters, multiplying them by -1.
Make sure that you allow for negative values for the objective components in TIMES, by defining UC_RHS('OBJxxx','N') = <any value> for all cost components (OBJxxx
= OBJINV, OBJFIX, OBJSAL, OBJVAR);
Run the model with the new scenario included.
Note that in this method, the objective functio

### 17. stock of chp

**Asked by:** kxxu | **Forum:** VEDA FE - Questions and Observations | **Thread:** [307](../../raw/forum/threads/307.json) | **Posts:** 30

**Question:**
> I've got a problem with definig stock of my chp process. I've got ceh between 0.2, my max electrical power is 120 mw and my max thermal power is 156. My stock is 156 or 156+110???

**Answer** (by Antti-L):
> The
thermal power
of a power plant is defined as the maximum level of energy extracted from the fuel.  For example, if a 1 GW(e) coal-fired power plant has an efficiency of 40%, the thermal power is 2.5 GW(th). See for example
http://c21.phas.ubc.ca/article/clean-coal
In TIMES, for a CHP with a backpressure turbine, the capacity will never be greater than the thermal power, assuming that you use the parameters ACT_EFF, NCAP_CHPR and VDA_CEH for defining the main technical parameters, and the efficiency is below 1. The capacity will represent either the maximum electrical power in condensing mo

### 18. My CHP process doesn't work

**Asked by:** huichenpku | **Forum:** VEDA FE - Questions and Observations | **Thread:** [404](../../raw/forum/threads/404.json) | **Posts:** 30

**Question:**
> Dear all,
I designed a CHP process referring to existed cases, but I found my CHP process doesn't produce heat at all, and I hope someone can answer me. Thank you!
~FI_T
TechName
Comm-IN
Comm-OUT
STOCK
EFF
AFA
INVCOST
FIXOM
CHPR~FX
VDA_CEH
CEH
LIFE
PRC_CAPACT
*Technology
  Name
Input Commodity
Output Commodity
Existing Installed Capacity
Efficiency
Utilisation Factor
Invesctment Cost
Fixed O&M Cos

**Answer** (by Antti-L):
> The
thermal
efficiency
of a conversion process refers to the conversion
efficiency, in other words it is the output/input ratio. See
https://en.wikipedia.org/wiki/Thermal_efficiency
For a
CHP technology with
flexible outputs
, in condensing mode
the thermal efficiency is thus the ratio of electricity produced to fuel
consumed, and in the CHP mode it is the ratio of electricity+heat produced to
fuel consumed.
For modeling a CHP technology with
flexible outputs of electricity and heat, you will need the following
parameters:
Thermal efficiency (either in
     condensing mode or full CHP mode): A

### 19. Difference between COST and VAROM

**Asked by:** mresende | **Forum:** VEDA FE - Questions and Observations | **Thread:** [586](../../raw/forum/threads/586.json) | **Posts:** 30

**Question:**
> I have a TIMES model in which a process has two attributes: COST and VAROM. In the .lst file, I can see that TIMES is treating both attributes equally, that is, it sums both costs and multiply this sum by the process activity. Reading the manual, I understood that the difference between VAROM and COST is that
VAROM = VARCOST = VAR_XXX * XXX_COST, where XXX is any variable that represents an activi

**Answer** (by Antti-L):
> The main "mathematical" difference is that IRE_PRICE works only for
exogenous IRE processes
.  It is ignored for any other processes. ACT_COST works for all processes.
Another "mathematical" difference is that IRE_PRICE can be differentiated by commodity and timeslice, while ACT_COST cannot: it can only be specified on the activity at ANNUAL level. For defining commodity and/or timeslice-specific costs, use FLO_COST / FLO_DELIV instead of ACT_COST.
Thus, for
exogenous IRE processes
IRE_PRICE is equivalent to FLO_COST (and in your example apparently also to ACT_COST).

### 20. Peaking Equation

**Asked by:** Yacine | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1048](../../raw/forum/threads/1048.json) | **Posts:** 25

**Question:**
> Hello,
I was wondring why CHP process are not participating in the electricity peaking reserve equation by their Capacity.
Thanks you for your response.

**Answer** (by Antti-L):
> It is so by default, because 1) crediting by capacity would be a bit dangerous, as the capacity of CHP processes may be modeled in different ways, and 2) "back-pressure" type of CHP plants typically cannot be "regulated" sufficiently for being credited with their electrical capacity (they can only produce when there is sufficient heat demand).  But for pass-out turbine plants modeled with electrical capacity one could well assume contribution by Capacity, and you can define that by setting PRC_PKAF for the process.  You can then use NCAP_PKCNT for overriding AF as the contribution factor.
