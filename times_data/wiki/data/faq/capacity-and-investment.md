---
type: faq
title: "FAQ: Capacity And Investment"
aliases: []
tags: [faq, capacity-and-investment]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Capacity And Investment

This page collects frequently asked questions and expert answers about **Capacity And Investment** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 261
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

### 2. Cost benefit and Ranging

**Asked by:** wnijs | **Forum:** VEDA FE - Questions and Observations | **Thread:** [68](../../raw/forum/threads/68.json) | **Posts:** 220

**Question:**
> For technology comparison, it is very useful to have the cost/benefit ratios or the competitiveness gaps. Thanks to Antti, it is implemented in the TIMES code. From his presentation in Stockholm, I understood we should use
$SET BENCOST YES.
I added this in the Run file, but no new parameter appears. Not in Back-end and not in .gdx results file. From my past experience, I added objrng VAR_NCAP and 

**Answer** (by Antti-L):
> Indeed, it seems that I can now confirm that there appears to be a problem in some of the newer versions of GAMS, causing loss of user-specified data. For now, I have only tested GAMS v23.3 versus my "last known good version", GAMS v22.0.  However, there may be also newer versions of GAMS that don't manifest the problem. Depending on the assessor, the problem might also be called "a serious break in backwards compatibility", but on the basis of the existing documentation and my tests so far, I would myself definitely call it a
bug
.
Specifically, with respect to Damage costs, GAMS version 23.3

### 3. fixom/varom

**Asked by:** Denis | **Forum:** VEDA FE - Questions and Observations | **Thread:** [39](../../raw/forum/threads/39.json) | **Posts:** 80

**Question:**
> hi everyone,
Amit,
could you describe in more detail FIXOM / VAROM / INVCOST attributes (description, units, when required etc.), for FIXOM / VAROM - are there any differences when describing existing and new techs ?
am I right that the dimension of FIXOM is monetary units per a unit of installed capacity and that of VAROM - per unit of activity?
Thanks.

**Answer** (by AKanudia):
> You are right about the definition of FIXOM and VAROM.
You will find comprehensive and accurate descriptions of all TIMES parameters here:
http://www.etsap.org/docs/TIMESDoc-Details.pdf
Consult the VEDA FE
Attributes Master
(under Advanced Functions)  to see how the alias that are sometimes used in VEDA models map to the original TIMES parameters. For example, the TIMES parameters for FIXOM and VAROM are
NCAP_FOM
and
ACT_COST
.

### 4. Capacity units in gdx/dd files vs veda

**Asked by:** iris | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1195](../../raw/forum/threads/1195.json) | **Posts:** 75

**Question:**
> Hello,
I am trying to read the capacity and activity units directly from either DD or GDX files that are created by Veda from my model files in Excel.
In Veda2.0, the capacity units appear as the are specified in the Excel model files. However, there is no PRC_CAPUNT data in the GDX or DD files. PRC_ACTUNT and PRC_COMUNT do appear in both the DD and GDX files.
What files does Veda2.0 use to read t

**Answer** (by Antti-L):
> Well, if you can still accept my thoughts, here is my understanding:
PRC_CAPUNT is a
TIMES
attribute.  Not all TIMES attributes are supported by VEDA.  You can see the list of TIMES attributes supported by VEDA2 from
Information → TIMES Attributes
.  I cannot see PRC_CAPUNT there, and so my conclusion is that it is not supported at all by VEDA, and therefore cannot be handled in any way, nor written into the DD files.  However, I admit I cannot see PRC_ACTUNT there either, and so I could be also mistaken.
Nonetheless, in
~FI_Process
tables there is a column
Tcap
, which has alias names "capaci

### 5. Modeling investments and mandates

**Asked by:** qzaus | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [966](../../raw/forum/threads/966.json) | **Posts:** 75

**Question:**
> I am interested in modeling some mandates and investment policies. For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates? Should I also modify corresponding demands to reflect these changes? Thank you!

**Answer** (by Antti-L):
> > [(06-03-2021, 01:00 AM)qzaus Wrote:] For a policy that mandates investments in electric vehicles, besides increasing the proportion of EV's using UC_COMPRD of imposing lower bounds, will there be any other measures to accommodate such investment or mandates?
I have been using market share constraints, for the share of EVs in the total sales of new cars, in addition to market share constraints for EVs in the total passenger car travel demand.  I think at least the former could be a "real-world" policy mandate. But anyway, almost any policy requirement that can be described by convex programmi

### 6. Unnormal results

**Asked by:** xiao.li8@mcgill.ca | **Forum:** VedaOnline - Questions and Observations | **Thread:** [1341](../../raw/forum/threads/1341.json) | **Posts:** 74

**Question:**
> Hi Folks,
Good day!
My extracted results have no
attribute regarding cost (Cap_New, Cost_Act, Cost_Flow...)? Yet we have confirmed that the costs parameters are complete. Is there anybody know the potential reason?
(I attached the result files here).
Many thanks!
Xiao

**Answer** (by Antti-L):
> Ok, I had a quick look, due to your private request.
First of all, the model instance did not include any
new technologies
for transport, and because your existing capacities were defined to
decrease linearly
, that already explains some dummy imports occurring in 2021. However, below I will focus on the 2020 (base year) dummy imports issue for
TRA_TRU
.
The
2020 dummy imports
for
TRA_TRU
are caused by the
CO2 constraint
. You are limiting the total historical CO2 emissions in 2020 to
645,400
, although the model has been calibrated to produce total emissions of
818,130
. I checked that by rem

### 7. LCOE

**Asked by:** frangb99 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1356](../../raw/forum/threads/1356.json) | **Posts:** 70

**Question:**
> When asking for VAR_NCAPR to know the levelized cost, why it does not appear in years where there is not new investment?
As you can see in the image those are the results i have, but if i want to know the LCOH in h2_pipe_bel (which is basically the export process) in 2050, where there is activity of 0.91 PJ, what i have to do?

**Answer** (by Antti-L):
> The levelized cost of energy (LEC) measures the average net present cost of energy production over the
lifetime
of a production plant.  It is used for investment planning and to compare the economic competitiveness of different production technologies on a consistent basis.  Therefore, it is by definition associated with a
capacity investment
, and in TIMES these are identified by technology vintages. Consequently,
Var_NCapR
(LEC) is a vintage-specific cost measure, and is reported only for
vintages
having some new capacity installed.
If you have some activity for a process in 2050, but no new

### 8. Yearly subsidy expenses not annual investment subsidy

**Asked by:** kristofferand | **Forum:** VEDA FE - Questions and Observations | **Thread:** [646](../../raw/forum/threads/646.json) | **Posts:** 70

**Question:**
> Hi,
I am modelling a policy involving a subsidy on process in a TIMES model. To this aim I use the attribute NCAP_ISUB. However when the NCAP_ISUB is reported in VEDA-BE or read from the gdx-file it seems by default to be reported in terms of
annualized
investment subsidy based on the process lifetime and the process discount rate ?! Is there currently a way to get information on the actual yearly

**Answer** (by Antti-L):
> Right, LUMPIX reports the lump-sum investment subsidies/taxes, but without the impact of any
hurdle rate
.
But if you have defined a hurdle rate, you should remember that it is applied to the subsidies as well (see documentation, Part II for details). Investment taxes and subsidies are thus by design treated in the same way as the normal investment costs (as designed by professor Richard Loulou), with the hurdle rate being applied to all.
INVX+ thus gives the additional impact of the hurdle rate on the investment taxes/subsidies.  I thought that one might want to have it separated out, because

### 9. NCAP_AFC and NCAP_AFA

**Asked by:** AngeBlanchard | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1014](../../raw/forum/threads/1014.json) | **Posts:** 69

**Question:**
> Hi everyone !
I am curently leanrning how to use VEDA and the TIMES model.
I have a question about the two attributes NCAP_AFA and NCAP_AFC : I understand they represent the load factor of a process, the former modelling a sort of mean value over all the commodities that come out of a process, and the latter representing a sort of relative value, but I'm not sure actually .
Can someone tell me how

**Answer** (by Antti-L):
> >
1. The system tends to use IMPDMZ to meet the output demand (R_ES-AP-SpHeat), even though there is remaining capacity for those technologies (like R_ES-SH-AP_HET).
Not true.  There is no remaining capacity for R_ES-SH-AP_HET, the capacity is fully utilized (100%) over the winter timeslices, even though the resulting ANNUAL utilization factor is only 0.2486, i.e. much lower than your limit.  In addition, I can see that the price of e.g. ELC and RSDELC is astronomical in 2020, and so there would be no remaining capacity for any technology using RSDELC either.
>
2. I defined input shares for RS

### 10. Modeling transmission lines in multi-regional models

**Asked by:** saleh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [498](../../raw/forum/threads/498.json) | **Posts:** 67

**Question:**
> Hi,
I am developing a multi-regional electricity dispatch model. The commodity that can be traded between different regions is electricity. I defined transmission lines as bi-directional trade links between regions. I think I can define each link (transmission line) capacity and cost using ScenTrade_Trade_PARAM.xls, however, I am wondering how I can model capacity addition for each transmission li

**Answer** (by Antti-L):
> Ahh…, sorry again, I overlooked the fact that you are defining the G_YRFR on multiple timeslice levels! In fact, you are defining them on all levels, including the ANNUAL level. That is quite unusual, as most users define the year fractions only on the finest level, typically the DAYNITE level.  The fractions on the other levels are then implicitly defined to be the sums of the fractions of the timeslices below each higher level timeslice, which is easy and consistent.
But, as you have pointed out earlier, the user obviously must have had some purpose for defining the values on multiple levels

### 11. simulating technology economies of scale

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

### 12. UC Capacity Growth Constraint - Troubles at end of horizon

**Asked by:** Giulia Realmonte | **Forum:** VEDA FE - Questions and Observations | **Thread:** [645](../../raw/forum/threads/645.json) | **Posts:** 66

**Question:**
> Dear all,
I am trying to implement an annual growth constraint (10% per year) on a process installed capacity, using a UC scenario file, but I have some troubles in the result at the end of the modelling horizon, as the bound is not respected. Indeed, in 2100 (last milestone year) there is a spike in installed capacity, while up to 2090 the constraint was met.
Probably I am doing something wrong i

**Answer** (by Antti-L):
> Thank you for providing the model input files for investigating the issue.
Indeed, you have discovered a bug in TIMES related to certain types of dynamic user constraints. This bug manifests itself only when all of the following conditions are true:
• The dynamic user constraint is formulated by summing over regions
• The dynamic user constraint is formulated with the dynamic type (t, t+1)
• The model is run by fixing the first periods to a previous solution (using FIXBOH)
As you can see, the bug appears only under rather specific conditions, which I guess explains that it has not been discove

### 13. Preventing early retirements with RCAP_BND

**Asked by:** ach | **Forum:** VEDA FE - Questions and Observations | **Thread:** [732](../../raw/forum/threads/732.json) | **Posts:** 66

**Question:**
> Hello. I'm seeing early retirement of vintaged processes in my TIMES model. I added investment costs, O&M costs hoping that costs associated with capacity deployment will prevent early retirement, but it didn't help.
I have not enabled early retirement. I tried to fix the problem by defining a column RCAP_BND in the FT_T table but upon synchronizing I get the "alien element ignored" error. What's 

**Answer** (by Antti-L):
> Thanks for acknowledging that you found the documentation of NCAP_SEMI.
> [(17-04-2019, 02:19 AM)ach Wrote:] I was unable to find the all  DD files, but the RUN files are attached. The directory with DD files is polluted with multiple DD files that seem to match multiple models, and I picked the most obviously relevant one. Please let me know if this isn't adequate.
As it seems that you have not found any technical problem in the model to be investigated, there is no need to have the files now. But for your information: The
*.DD
files and the
*.RUN
file comprise the
full set of model input dat

### 14. UC_Growth seed value violated

**Asked by:** ach | **Forum:** VEDA FE - Questions and Observations | **Thread:** [826](../../raw/forum/threads/826.json) | **Posts:** 66

**Question:**
> Hello,
Facing issues similar to the ones mentioned in this thread:
http://forum.kanors-emr.org/showthread.php?tid=354&highlight=UC_RHSRTS
, I checked the capacity deployment associated with a rapidly growing technology that should be restricted. I found that the model, whenever it deploys one of the new technologies that have an existing capacity of zero, will deploy a large amount said technology

**Answer** (by Antti-L):
> > [(23-03-2020, 10:30 PM)ach Wrote:] I'm still seeing violations of the seed value. My UC_Growth and some VEDA BE output screenshots are attached. Could you please suggest what's happening? Hopefully I've made all the suggested changes to UC_Growth. I'm not sure about my use of U_CAP~0 and interpolation rule 11.
Well, for one thing, you are still deliberately choosing the (T, T+1) variant for the dynamic growth constraints, as I have tried to explain.  As mentioned several times earlier, you should define GROWTH on the RHS side if you would like to use the (T, T−1) variant, but it seems you do

### 15. PCG Observation and question

**Asked by:** Antti-L | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1254](../../raw/forum/threads/1254.json) | **Posts:** 65

**Question:**
> I have observed that if I have a process with a single NRG output COM, VEDA usually by default sets the PCG=COM.
However, as soon as one defines a Share-O for such a process (like Ceas19 defined for EAUTELC00 in the TIAM model), the PCG is changed to be XXXX_NRGO.  As a subsequent side-effect, when the PCG is a genuine group, the process will no longer contribute to the peak by capacity.
Q:
Is thi

**Answer** (by Antti-L):
> I am not sure what you mean.  The VEDA default for PCG is already COM, if the PCG is not explicitly specified, and there is only a single output commodity COM.
What I don't understand is why this default is currently changed, if the user specifies a FLO_SHAR for the output. Is there some reasonable explanation to that, or can it be considered a bug?
>
Would this work? If PCG is a Veda default CG with only one COM, PCG is replaced by COM.
No, that does not seem reasonable.  If the user specifies NRGO as the PCG, it think it should definitely
not
be replaced by COM.  But I am not sure I understo

### 16. UC not working

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

### 17. NCAP_CPX and NCAP_OCOM

**Asked by:** vincedh | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1328](../../raw/forum/threads/1328.json) | **Posts:** 65

**Question:**
> Dear all,
I am shaping the capacity transfer of vehicles using NCAP_CPX and SHAPE, and I would like to defined a commodity flow (out) based on the retired capacity. However, testing NCAP_OCOM, it seems that it does not take into account the shaping of capacity transfer to account for the retired capacities. Instead, It considers that all the capacity of given vintage retires when it reaches its en

**Answer** (by Antti-L):
> I can see some errors and inconsistencies, e.g. the shaped CAPFLO multiplier is not averaged by discounting in TIMES (while the shaped capacity transfer is), and I cannot quite make sense out of equation 1.8 (together with 1.7).
Anyway, maybe we could try to see it more conceptually. You agreed earlier that the cumulative flow in a period is given by: [average flow at milestone year]x[duration of the period], and that the cumulative outflow of the NCAP_COM flow (in the period) should be proportional to the capacity decrease in that period.
Therefore, shouldn't the outflow at the Milestone year

### 18. Capacity for storage

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

### 19. Issue inserting small values for RCAP_BND

**Asked by:** till | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1504](../../raw/forum/threads/1504.json) | **Posts:** 65

**Question:**
> Dear Kanors developers and all,
I have recently faced an issue when trying to insert values for the RCAP_BND attribute that are smaller than 1. (here my implementation
)
Veda throws the warning: "The value is not a number". (see
)
However, Veda reads the values correct if they are set to 1 and the model works, when I manually insert smaller values in the corresponding dd file. That's why I assume,

**Answer** (by Antti-L):
> While as yet there seems to be no resolution to the issue by the VEDA Support staff, I have a simple question about the purpose of the small bounds.  The retirement variables have a default lower bound of zero, and you seem to be imposing a small positive values, why is that?  If it is for activating retirements, note that it is sufficient to define
any
value for RCAP_BND, e.g. just an interpolation option without any effect like RCAP_BND(r,'0',p,'N')=1.
This is not to say that the issue shouldn't be resolved; I find it very intriguing.

### 20. Model compilation error

**Asked by:** pankaj | **Forum:** VEDA FE - Questions and Observations | **Thread:** [596](../../raw/forum/threads/596.json) | **Posts:** 65

**Question:**
> Hi,
I am making a model with DayNite timeslices and with timeslice specific availability factors defined by NCAP_AF and capacity to activity factor defined by PRC_CAPACT. I am getting errors in model compilation.
Attaching the error screenshot and import error log.
Thank you

**Answer** (by Antti-L):
> Thank you!
However, I am not able to see myself where the error is. I hope the Kanors staff can look at it.
It looks like this could be a bug in VEDA-FE, because, as mentioned, the DD file
base_run_ts.dd
(which you posted) contains quite incorrect timeslices, including "SEASON" and a lot of others, which have not been defined in SysSettings, as far as I can see...
