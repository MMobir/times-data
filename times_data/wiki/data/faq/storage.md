---
type: faq
title: "FAQ: Storage"
aliases: []
tags: [faq, storage]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Storage

This page collects frequently asked questions and expert answers about **Storage** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 79
**Top Q&As shown:** 20

---

### 1. ELC Car as night storage technology

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [8](../../raw/forum/threads/8.json) | **Posts:** 298

**Question:**
> Hi Amit,
Today, I found a very helpful tutorial on the VEDA Support website about how to model an electric vehicle as a night storage device.
support.kanors-emr.org/#VEDA-FE/SubFile_ModelLibrary/NIGHTSTORAGEDEVICES.htm
I have a few quick questions about the tutorial, and how I might be able to adapt this technology to our CA-TIMES model.
(1)  The process set "NST" is not one that I've ever seen be

**Answer** (by Antti-L):
> I think you are missing quite a lot here. Please find my quick answers below (referring to your statements by SN and to my answers by AN):
S1:
Since all of the other technologies do not use any GSL, they are acting much more as pure battery electric vehicles rather than PHEV, and so none are really suitable for modeling PHEV and are best avoided.
A1:
Not true. I think I clearly explained how you can define any necessary share constraints even for the inputs of genuine storage processes. So, there is no reason to avoid these modeling approaches as such, if you really need to optimize the activi

### 2. UC Scenarios and Storage

**Asked by:** Kannan | **Forum:** VEDA FE - Questions and Observations | **Thread:** [10](../../raw/forum/threads/10.json) | **Posts:** 294

**Question:**
> In Swiss TIMES, a number of UC have been declared for calibration purpose (e.g. ELC import level).
All
UCs are kept in a scenario file that must go with BASE case run.
Now we wanted to have a (stringent) variant scenario (i.e. limiting level of ELC import), for which I have created the same UC like one in the BASE, but different data.
This UC is kept in another scenario file.
However, when I was r

**Answer** (by Antti-L):
> Thanks, Kannan, for providing the DD files and RUN file for my investigation.
Running and analysing the model revealed some crucial problems in the model specification, but also a couple of issues in the TIMES code. The problems in the model were the following:
For the IPS storage, you have defined STG_LOSS = 1. This means that the annual storage losses are 100%, which is both meaningless for an inter-period storage, and also causes the storage flows to vanish from the storage equations. Consequently, the output flows became free due to the 100% annual losses.
Proposed remedy
: Either assume l

### 3. NCAP_AFCS parameter not recognized

**Asked by:** Sandro_Luh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1095](../../raw/forum/threads/1095.json) | **Posts:** 75

**Question:**
> Dear experts
I just tried to implement a charging profile for a battery into my model, which defines for each timeslice (hourly) the maximum availability. For this, I tried to apply "NCAP_AFCS" as it is defined in the documentation (see image 1, lower row)
When I synchronize my model, I get an error message that says that the file which includes the NCAP_AFCS data is empty. VEDA gives me the error

**Answer** (by Antti-L):
> >
If I understand the CAFLAC equation and the definition of STG-processes correctly, the RHS of the CAFLAC equation basically gives for each timeslice the (maximum) total activity of the process (Capacity * Availability Factor * CAPACT), which is for an STG process the maximum amount of energy that can be stored in that process.
No, you have not understood it correctly.  In fact, as described in the documentation (Part II), it is quite the opposite.  For a storage process, it is the standard
NCAP_AF
parameter (without using any NCAP_AFC), which gives for each timeslice the (maximum) total
acti

### 4. VEDA2 Question

**Asked by:** Antti-L | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1364](../../raw/forum/threads/1364.json) | **Posts:** 75

**Question:**
> I have been getting some more SyncLog issues with VEDA2 v3.0.7, compared to earlier versions, e.g.:
o TechDesc column in
FI_T
tables triggers a warning about column not recognized or invalid
o  NCAP_AFC~ANNUAL in
FI_T
tables triggers an error about column not recognized or invalid
The warnings of the first kind are of course cosmetic of nature, but because
TechDesc
has been used in numerous model 

**Answer** (by Antti-L):
> Thanks.
I am confused if you say that
TechDesc
would be an invalid column in
FI_T
, because it has been heavily used in TIMES models developed by KanOrs itself. For example, the well-known
ETSAP-TIAM
model. And it has never before caused any warning about "unrecognized or invalid column".  Not in VEDA-FE, and not in VEDA2 v2.x  So, can you please explain how could it now suddenly, after all these years of being valid under VEDA, would now be considered "unrecognized or invalid column"?
I think it is a
break
in backwards compatibility although only
in terms of warnings
. But I cannot believe an

### 5. problem with kre storage

**Asked by:** frangb99 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1351](../../raw/forum/threads/1351.json) | **Posts:** 70

**Question:**
> SubRES_STO_Techs_noELC.xlsx
(Size: 955.69 KB / Downloads: 3)
Hello again, here is my file where i am modelling some storages, as you can see here i am not using ELC as auxiliary input. When i run the hole model, there is one result that makes 0 sense. Which is this one:
As you can see there is a negative flow in the OUTPUT of the KRE storage. Can anyone maybe have a look at it, and maybe see why t

**Answer** (by Antti-L):
> I looked at the GRDSTOHSTNOCO2XTRMN0_PI process now, over which you had some confusion.  I can see it is a normal process (i.e. not a storage process).
You have defined the PCG of the process as GRDSTOHSTNOCO2XTRMN0_PI_NRGO, and the only output of this process is the energy commodity ("GRDSTOHSTNOCO2XTRMN0_IN"), and so that is the PCG. The inputs are CO2 and ELC, of which ELC is an auxiliary flow. I wonder how this process converts CO2 to energy, with the assumed efficiency 0.95?
Moreover, the efficiency parameter EFF defines ACT_EFF(r,y,p,'ACT',ts) = 0.95, which assumes that there is a shadow

### 6. Load Shifting Storage Processes

**Asked by:** DOlih | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1101](../../raw/forum/threads/1101.json) | **Posts:** 65

**Question:**
> Hello Everyone,
I would like to know if there is any demo about Load Shifting Storage Processes in VEDA-TIMES or if anyone that has any example that could share with me.
Thanks in advance!
DOlih

**Answer** (by Antti-L):
> The load shifting is of course designed to respect the specified time limit. However, unless you have specified also costs on the shifting (as in the example), the model might easily want to choose
chaining
the elementary load shiftings in such a way that even if one shift is 3 hours, then a second shift is chained with it, resulting in a combined 6 hours' shift.  In a convex model, it is not possible to prohibit such chained shifts, but if you define costs on the load shifting time, it would become more expensive to do so.  In a MIP model it would be possible to strictly prohibit chained shif

### 7. Capacity for storage

**Asked by:** frangb99 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1387](../../raw/forum/threads/1387.json) | **Posts:** 65

**Question:**
> Good aternoon,
I have been reading about the storages in the documentation but i still do not understand some things. My problem is that in my model the capacity that the results are showing are extrmly small when actually the capacity needed is quite high. For example, i would need capacities over 1 PJ (or PJa) and the results in my model says a capacity of 0.0083.
How exactly are the capacitues 

**Answer** (by Antti-L):
> Thank you for the model files.  As I was able to think of multiple possibilities about your issue, it was good to see the whole model, and eliminate the possibilities. But the issue turned out to be just a very basic mistake in your model, which I was quickly able to see.
I hope you have read the documentation, which describes the
timeslice tree
and the related
timeslice cycle
concepts, employed in TIMES.  These basic features are accompanied with certain default assumptions, which your model did not seem to comply with.
Briefly reiterating the basics, the default assumption in TIMES for
DAYNI

### 8. NCAP_AFC and seasonal storage

**Asked by:** Kristina.Haaskjold | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1322](../../raw/forum/threads/1322.json) | **Posts:** 62

**Question:**
> Hi,
We are using NCAP_AFC to model storage, both daynite and seasonal storage.
The daynite storage is working proparly by converting the investment cost from energy to capacity through: invcost * NCAP_AFC * (24/8760).
For the seasonal storage, we are unsure if the convertion is functioning as intended. Is it correct to multiple with 2190/8760 instead of 24/8760, considering 4 seasons within a year

**Answer** (by Antti-L):
> I am not quite able to follow your thinking.
>
The daynite storage is working proparly by converting the investment cost from energy to capacity through: invcost * NCAP_AFC * (24/8760).
If you use NCAP_AFC(ELCC,DAYNITE), where ELCC is the output electricity, then the capacity represents the max. output level of ELCC.  Typically such output capacity is in the unit of GW, and PRC_CAPACT would typically be 31.536 (where the flow unit is PJ).
Let's say you want to model a battery storage with an energy capacity of 6 GWh per GW, i.e. 6 hours' capacity. Therefore, if we denote the investment cost pe

### 9. Storage Interpeting In and Out flows

**Asked by:** vangelis | **Forum:** VEDA FE - Questions and Observations | **Thread:** [367](../../raw/forum/threads/367.json) | **Posts:** 61

**Question:**
> Dear experts,
I have a storage process (pump) which is defined as STS and is  operating at the DAYNITE level. I use the NCAP_AFC for ANNUAL and DAYNITE timeslices and the same in/out commodity (ELC).
The units are GWe for the capacity and PJ for the output commodity, with a CAP2ACT=31.536.
The model has 288 timeslices distinguishing between 4 seasons and 3 typical days with 24 hours each (4*3*24=2

**Answer** (by Antti-L):
> NCAP_AFC expects a commodity group, and so it is safest to specify the CommGrp in the CommGrp column.  In addition, NCAP_AFC expects a timeslice level, which you had omitted.
See the attached with these corrections. (Note that I have added a FI_Comm table just for my quick testing).
Concerning the auxiliary flow approach, I can understand that it might be necessary/useful if you would want to optimize the size of the charger, and therefore would like to model the charger as a separate process. But I cannot see from your earlier screenshot that you would have defined the auxiliary flows at all 

### 10. (Pumped) Storage modelling

**Asked by:** Antti-L | **Forum:** VEDA FE - Questions and Observations | **Thread:** [506](../../raw/forum/threads/506.json) | **Posts:** 61

**Question:**
> Re-post, because my earlier reply to fg's post seems to have disappeared
.
> [fg Wrote:] My task is to integrate pumped hydro storages as STGTSS properly into our model and I've now been reading both through the documentation and a couple of threads here in the forum, but still remain somewhat puzzled.Issue IAccording to my understanding, the termcapacityis unfortunately blurry when it comes to st

**Answer** (by Antti-L):
> Re-post, because my earlier reply to fg's post seems to have disappeared
.
> [fg Wrote:] My task is to integrate pumped hydro storages as STGTSS properly into our model and I've now been reading both through the documentation and a couple of threads here in the forum, but still remain somewhat puzzled.Issue IAccording to my understanding, the termcapacityis unfortunately blurry when it comes to storages, as in literature it can refer both toa) therated power outputof the turbine / input of the pump, measured in e.g.[GW]orb) theamount of energythat can be stored in, measured in e.g.[GWh]Do I un

### 11. Storage modelling, timeslice resolution and G_CYCLE

**Asked by:** alro | **Forum:** VEDA FE - Questions and Observations | **Thread:** [737](../../raw/forum/threads/737.json) | **Posts:** 60

**Question:**
> Hi,
we have an issue in our model regarding modelling of storage and time slice resolution. We think that we probably need to define a non-default G_CYCLE parameter, but based on documentation and relevant forum treads, we have not quite understood how the G_CYCLE parameter works in our case.
Timeslice resolution of our model is as follows (full file with YRFR attached):
Season
: SP, SU, AU, WI
We

**Answer** (by Antti-L):
> Ok, I have now investigated the differences in the model runs, between the following two cases:
1. Define only G_CYCLE(DAYNITE)=365/7=52.143
2. Define both G_CYCLE(DAYNITE)=365/7=52.143 and G_CYCLE(WEEKLY)=8760/(24*7)/13=4.01
You reported that the results for storage would be different between these two cases.  My tests did not confirm your findings:  The value of the objective function from these two runs was
exactly the same
, and so any differences in the results would be of cosmetic nature, due to degeneracy (multiple solutions having same objective value).  And concerning the operation of

### 12. nightstorage

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [159](../../raw/forum/threads/159.json) | **Posts:** 55

**Question:**
> Is it possible in some way to have nightstorage deliver some of its output during the night or should I go for another approach

**Answer** (by Antti-L):
> > [dvanre Wrote:] Is it possible in some way to have nightstorage deliver some of its output during the night or should I go for another approach
It all depends how you model your night storage. A night storage process that produces a DAYNITE level commodity can only deliver its output during the non-night timeslices. This has always been so in TIMES, and it is by design. The night timeslices that can be used for the charging are defined by PRC_NSTTS.
On the other hand, night storage processes that produce an ANNUAL level commodity will deliver their output according to the load curve of the c

### 13. Energy storage at Day-Night time slice level

**Asked by:** Arne@IFE | **Forum:** VEDA FE - Questions and Observations | **Thread:** [389](../../raw/forum/threads/389.json) | **Posts:** 55

**Question:**
> Hi
I'm trying to model a battery storage device, but I'm facing a problem with the relation between the energy storage level and the capacity of the battery. It works ok at seasonal and weekly time slice level, but when I try to use day-night time slice for the battery, the capacity (MW) of the battery becomes too low.
I'm using a storage device (Not NST or STK).
Any suggestions on how to model a 

**Answer** (by Antti-L):
> I am sorry to interfere with the discussion, but I am not
sure why you say that there is a violation.
According
to the documentation on EQ_CAPACT:
VAR_ACT(r,v,t,p,s)
≤
VAR_NCAP(r,v,t,p)×COEF_CPT(r,v,t,p)×COEF_AF(r,v,t,p,s,’UP’) ×PRC_CAPACT(r,p)×RS_STGPRD(r,s)
Therefore,
if you have N days under the parent timeslice (apparently
W01
), the activity
can be at most N times the capacity in each DAYNITE timeslice
under W01, assuming NCAP_AF=1 (internally
COEF_AF)
. If your capacity
is 15.39 GWh, the activity can thus be at most N×15.39 GWh. As your input flow (84.53) occurs in a single timeslice, yo

### 14. Storage PV

**Asked by:** wnijs | **Forum:** VEDA FE - Questions and Observations | **Thread:** [210](../../raw/forum/threads/210.json) | **Posts:** 50

**Question:**
> At VITO, we are running a test model with 12 timeslices (R/S/F/W each with D/N/P) with only an electricity demand, photovoltaic supply and some generic storage process (STG-TSS) with a battery function. We made PV unavailable during night (of course) but also play with the availability in other timeslices to simulate possible long periods without sun and to see how storage reacts.
The TIMES manual

**Answer** (by Antti-L):
> A small follow-up to the storage issues:
I decided to take a look at the generalized storage concept myself, and arrived at an implementation. I hope to include the new storage type in the next version of TIMES.
When specified at the DAYNITE level, the new storage type automatically combines the DAYNITE, WEEKLY and SEASONal storage capabilities (when the timeslice levels exists in the model). And when specified at the WEEKLY level, it combines the WEEKLY and SEASON capabilities. In addition, if the process is defined to be also of type
STK
, it will include even the inter-period storage capabi

### 15. ensuring a generated commodity is used?

**Asked by:** cyang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [238](../../raw/forum/threads/238.json) | **Posts:** 40

**Question:**
> I have a couple of examples where I would like to require that a commodity that is produced in one process must be used in a subsequent process.
For example a plant that produces and captures CO2 for CCS purposes must then go into the process for being stored underground (transport and injection to underground storage).  Right now it seems my model is just making this intermediate compressed CO2 a

**Answer** (by Antti-L):
> Thanks for the model files.
Having the model at hand, it was easy to see.  You have defined the commodity TRAELCT on the DAYNITE level, and the demand level for it is varying over timeslices according to the demand profiles.  However, the only process supplying TRAELCT is TRAELCT00, which was defined on the ANNUAL level.  An ANNUAL level process (with PCG=output) can only produce the outputs evenly throughout the year (unless the output would have a COM_FR profile). So, it is immediately clear that there was inevitably overproduction in some timeslices, if TRAELCT00 was supposed to satisfy all

### 16. storage - 2 diffrent commodities

**Asked by:** kxxu | **Forum:** VEDA FE - Questions and Observations | **Thread:** [291](../../raw/forum/threads/291.json) | **Posts:** 40

**Question:**
> How to properly efine storage device when one commodity is  in and other is out, for example electricity in and heat out? I've read something about nst in manual, but there's no example. I've built very simple model, where's power plant and storgae device(electricity in, heat out) and set demand on heat only. Storage device is not working properly, it just makes heat fom nothing. I think the stora

**Answer** (by Antti-L):
> 1) You should define the process to be a storage process, by using an appropriate process type indicator in the
~FI_Process
table.  Valid types are STG (regular timeslice storage), NST (night storage), STS (generalized timeslice storage) and STK (inter-period storage).
2) If defining a DAYNITE level process to be of type NST, you must also define the night timeslices by using the
PRC_NSTTS
parameter. If they are left undefined, the storage will not be able to operate.
3) If using different input / output commodities for a regular or generalized timeslice storage (STG or STS), you should define

### 17. Help with constructing user constraint (ZEV)

**Asked by:** cyang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [301](../../raw/forum/threads/301.json) | **Posts:** 40

**Question:**
> Hi,
I am trying to represent California's Zero Emission Vehicle (ZEV) mandate in a user constraint but I'm running into trouble.
I thought the representation is relatively straightforward but I'm having trouble setting it up as a VEDA scenario file.
Each ZEV vehicle type has a weighting factor (a) that is multiplied by the number of vehicles sold in a given year to give more or less "credit" to th

**Answer** (by AKanudia):
> what you have is equivalent to:
(weights x sales of targeted cars) >= target x sales of non-targeted cars
here is what it should be:
(weights x sales of targeted cars) >= target x (sales of targeted cars + sales of non-targeted cars)
rearranging, you will get new coeff for the targeted cars as (weight - target). you can leave the first part unchanged (TCAR*) as the values for targeted cars will get overwritten anyway.
hope the answer is somewhat clear.

### 18. STS storage type support in VEDA

**Asked by:** vangelis | **Forum:** VEDA FE - Questions and Observations | **Thread:** [356](../../raw/forum/threads/356.json) | **Posts:** 40

**Question:**
> Dear all,
I know that Antii was so kind to implement a generic flexible storage process type, STS, which automatically combines the DAYNITE, WEEKLY and SEASONal storage capabilities.
However, he mentioned that this type was not supported by VEDA at the time he implemented it (version VEDA_FE 4.3.45).
Now that VEDA_FE is at version VEDA_FE 4.4.07, is this feature supported? I don't see it neither i

**Answer** (by Antti-L):
> Thanks for the problem report.
I have verified a problem with the generalized
STS
storage matching the symptoms given, but only in models making use of all of the four timeslice levels ANNUAL, SEASON, WEEKLY, DAYNITE.  This problem thus
does 
not appear in models that make use of only three levels, e.g.  ANNUAL, SEASON and DAYNITE.
Perhaps you can confirm that your model indeed makes use of all the four timeslice levels?
However, the problem is not in any way related to VEDA, but to TIMES. Maybe you should consider reporting the problem on the TIMES Forum instead of the VEDA Forum, so that the

### 19. Using inter-period storage to model waste treatment

**Asked by:** Xin Wang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [502](../../raw/forum/threads/502.json) | **Posts:** 40

**Question:**
> Dear all,
I read from the new version of TIMES document (Part II Refernece manual) that
An inter-period storage process is able to store energy or material over periods. For example, a coal stockpile or a waste disposal site can be modeled as an inter-period storage.
and
Modeling of methane emissions from landfilling in a dynamic way by using first-order decay functions for the gradual waste decom

**Answer** (by Antti-L):
> I have used the IPS approach for modelling the generation of methane from landfill sites, which may subsequently be captured and used for energy.  I have used two (parallel) IPS processes for two types of waste: fast degradable waste and slowly degradable waste.
The existing stock of waste (or degradable carbon) can be defined by STG_CHRG
The first-order decay functions can be defined by STG_LOSS (annual decay)
The gate fees can be modelled by defining FLO_COST on the storage input
The storage output can be bounded to zero by STGOUT_BND (if no waste retrieval is assumed)
The methane generation

### 20. Storage Process Cost

**Asked by:** mresende | **Forum:** VEDA FE - Questions and Observations | **Thread:** [689](../../raw/forum/threads/689.json) | **Posts:** 40

**Question:**
> Hi! This is my first time using a storage process and I need some help in defining costs for it.
I have defined 4 interperiod storage process in my model, with different input/output commodities, as shown next:
I also have a scenario file in which I define the costs of these processes:
However, doing this, the cost I declared is applied in the variable VAR_SIN(region, period, process, gas_ext, ANN

**Answer** (by Antti-L):
> The variables that you can refer to in UC constraints are VAR_ACT, VAR_FLO, VAR_IRE, VAR_CAP, VAR_NCAP, VAR_COMNET, VAR_COMPRD, VAR_CUMCOM, VAR_CUMFLO, VAR_CLITOT and VAR_CLIBOX.  These variables can be referred to by using the UC_ACT, UC_FLO, UC_IRE, UC_CAP, UC_NCAP, UC_COMNET, UC_COMPRD, UC_CUMCOM, UC_CUMFLO, and UC_CLI input attributes.
As I understood it, your desired constraints would be the following:
GAS_ASS_UP: −0.53*Production of gas_ext + 0.47*production of oil_lgt <= 0 , and
GAS_ASS_LO: −0.45*Production of gas_ext + 0.55*production of oil_lgt >= 0
Thus, I think you could just specif
