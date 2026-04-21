---
type: faq
title: "FAQ: Calibration"
aliases: []
tags: [faq, calibration]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Calibration

This page collects frequently asked questions and expert answers about **Calibration** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 123
**Top Q&As shown:** 20

---

### 1. UC Scenarios and Storage

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

### 2. Modeling a vehicle eff. target w/ user constraints

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [54](../../raw/forum/threads/54.json) | **Posts:** 293

**Question:**
> I'd like to model the US CAFE fuel economy standards out to 2016, and to this end, I have created the attached scenario file with a couple user constraints - one for light-duty cars and another for light-duty trucks.  However, I'm not 
sure if the constraints are doing exactly what I want.
The fuel economy constraints 
should only apply to *NEW* vehicles 
(i.e., an increasingly higher standard for

**Answer** (by Antti-L):
> Commenting on these VEDA-specific settings should be best left to Amit, but as far as I know, one had really better use the "0" setting for "Generate Vintage Bounds", unless you are actually manually introducing technology vintages in your model (by introducing separate processes for each vintage), and have given them names ending in year numbers.  Only in that case you can make use of the automatic generation of vintage bounds, which depends on the process names with year numbers. However, if you have some process names ending in numbers but not being intended to be interpreted as vintage yea

### 3. Cost benefit and Ranging

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

### 4. start year with different period definition

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [63](../../raw/forum/threads/63.json) | **Posts:** 160

**Question:**
> I have a problem with my model when running with different periods definition because of a lower bound on electricity heating in residential sector. The model is calibrated for 2005 and the new technologies for electric heating start in 2006. When I run the model with as milestone year 2005 (1year) 2006(2years) 2010(5years) ,everything goes fine but when I run with 2005 (2years) 2010(7years) I get

**Answer** (by Antti-L):
> Yes, according the original design in TIMES, PRC_NOFF considers the technology unavailable in a period whenever the milestone year of the period is inside the OFF range. But since version v3.0.1 you have been able to change the meaning of PRC_NOFF, such that it will consider a technology unavailable in a period only if the full period is covered by the OFF range.
You can change the meaning of PRC_NOFF by using the new parameter G_OFFTHD(y)=1, where y stands for the year, starting from which the interpretation should be changed. The year index was included in the parameter, because normally one

### 5. FLO_share

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [48](../../raw/forum/threads/48.json) | **Posts:** 120

**Question:**
> How can I transform a FX flo_share (as defined in the Base year template) into an UP share in a scenario file

**Answer** (by AKanudia):
> 0-0 is a great idea and I confirm that it still works.
The main difference between INSert 0-0 FX Share and UPDate FX Share=0 + OFFEPS is that the former requires explicit identification of TimeSlice, Region and Commodity, while one can get away with just a process filter in the UPDate approach. Note that using
CSET_SET + Top_Check
can greatly simplify p-c identification for INS tables.
In this case one needs to
identify
all r-p-c anyway as there is an INS Share UP involved in the second step, so the 0-0 approach does
not
impose any additional burden.

### 6. Changing Base Year

**Asked by:** olugovoy | **Forum:** VEDA FE - Questions and Observations | **Thread:** [66](../../raw/forum/threads/66.json) | **Posts:** 80

**Question:**
> Hi Amit and All:
When I'm updating a model, adding new data, what is the best way to do that?
F.i. I have a model initially calibrated to 2005. Now I got new data and want to make the BY=2009. Also would be nice to keep the past data and don't maximize during the years before 2009. I'm sure you do it a lot. What is your suggestions?
Thanks,
Oleg

**Answer** (by AKanudia):
> The course of action depends upon two things:
1. whether you have all the base-year data for 2009 or only some of it
2. the amount of time do you have to do this
If you have set up the base-year stocks via sectoral energy balances, then the cleanest way would be to update those tables and actually start the model in 2009.
What you are trying is to keep the base year but make 2009 look more like what has been observed. This is a very reasonable thing to do and we do it in our PET36 and TIAM models on a regular basis. The only general thing I can tell you is to think in terms of putting NCAP_BND

### 7. Preventing early retirements with RCAP_BND

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

### 9. Plausibility check

**Asked by:** fg | **Forum:** VEDA FE - Suggest New Features | **Thread:** [615](../../raw/forum/threads/615.json) | **Posts:** 65

**Question:**
> Just recently my model began to behave really strange, as it imported scenario data from Excel
perfectly into VEDA-FE (attribute CAP_BND)
but then one single data point was not shown in VEDA-BE after the model run (attribute PAR_CapUP)
.
As you can see this value of 45 GW for capacity upper bound for region 'DE' in year 2020 was simply missing, whereas all the other data were shown as expected.
So

**Answer** (by Antti-L):
> Hmm... yes, I agree on your views on "fail-safety" in a more general setting, but not so in this specific case.
I also agree that the user has had a certain intention when he set up the bounds. But I don't think the intention can ever be
getting an infeasible model
, and so there is absolutely no point in running such a model; it would only waste a lot of time. In my view, the intention would practically in all cases be that the upper bound should be the
maximum of the existing capacity and the bound defined
, which is equivalent to what TIMES does to it.
TIMES removes also other inconsistent 

### 10. Problems with FLO_EMIS

**Asked by:** ESand | **Forum:** VEDA FE - Questions and Observations | **Thread:** [783](../../raw/forum/threads/783.json) | **Posts:** 65

**Question:**
> Hi!
I have recently run into problems when trying to assign emission factors in my model. The emission factors register as it they should in both the SubRES files and base year file (see the attached "Picture1" showing the TIMES-view in VEDA, the yellow marked area is the base yeaar technology).
However, for some reason, the technologies in the BASE year generates the following error (from the QA-

**Answer** (by Antti-L):
> Dear Erik,
Thanks for providing the model input files, for my testing!
However, by running the model from these input files, I am not able to reproduce the problem. See below the contents of QA_CHECK.log I am getting for the model run, where I think there are no warnings related to the processes you described (and very much less warnings):
******          TIMES -- VERSION 4.3.7           ******
**************   QUALITY ASSURANCE LOG   **************
*** FLO_EMIS with no members of source group in process - ignored
*01 WARNING       -     R=SE           P=FUE-ETH1100-BIO CG=FUEBCP COM=FUECO2-Bc

### 11. Results of UC_Growth are not matching with given constarint

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

### 12. Early retirement for each year

**Asked by:** Sandro_Luh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1163](../../raw/forum/threads/1163.json) | **Posts:** 63

**Question:**
> Dear VEDA community
Within a model coupling exercise, I receive the number of vehicle sales and vehicle scrappage on an annual level. While it works fine to implement the sales for each year via NCAP_PASTI, I am struggling with implementing the annual scrapping:
I tried to define the annual scrapping via RCAP_BND for each year (e.g. 2028, 2029, 2030, 2031, and 2032). With RCAP_BND(2028), I intend 

**Answer** (by Antti-L):
> For curiosity, I made some small tests:
First, I just tested (once again) with a simple test model this "bound with retirement" functionality in general (successive NCAP_PASTIs with retirements enabled and CAP_BND to bound the capacity to a level that requires some retirements), and could not see any problems in it.
Second, I tested your problem case (1), but with a horizon up to 2025 only (because I think your CAP_BNDs were directly affecting only Milestones up to 2025), and indeed I saw Cplex having severe problems with the model (barrier not converging), with status
Feasible but (6) Non-opt

### 13. Detailed levelized cost

**Asked by:** Louis | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1355](../../raw/forum/threads/1355.json) | **Posts:** 63

**Question:**
> Hello,
I am trying to compute levelized costs using veda's outputs, and compare this computed value with VAR_NcapR (the aim is first to understand correctly how Var_NcapR is computed, and second to be able to decompose  VAR_NcapR into its different contributions).
To do so,  i use  the following formula (for a period of 10 years, 2046 to 2055, and the base year is 2005):
LC = [Cost_Inv*10/(1+r)^41

**Answer** (by Antti-L):
> I can make the following comments:
• You seem to have somewhat misunderstood the TIMES levelized cost calculation:
o Levelized cost is calculated over the full lifetime of the capacity installation, as defined in literature.
o In TIMES, levelized cost is thus vintage-specific (not calculated for each period, but for each vintage)
o You seem to be calculating a levelized cost separately for each period.
• The data on your spreadsheet is not fully sufficient for replicating the TIMES levelized cost calculation.
• I am sure I would be able to replicate the TIMES calculation in Excel if full proce

### 14. Forest sink and SHAPE curve

**Asked by:** Neha Jaggeshar | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1579](../../raw/forum/threads/1579.json) | **Posts:** 63

**Question:**
> Hi all,
A quick follow-up from a previous discussion on representing forest saturation with increasing stand age using the SHAPE attribute.
In my model, I’ve defined the forest stock process with the attributes NCAP_PASTI~2006, LIFE, and a removals factor defined with env~act. I’ve also defined the shape curve using FLO_FUNCX.
My expectation was that the removal results would decrease as stand age

**Answer** (by Antti-L):
> >
I tried setting NCAP_BND(r,'0','ForStock','UP')=2, following which the process would not run (zero output).
When this happened, was the model nonetheless 1) feasible with optimal solution, and 2) without dummy imports?  If both 1) and 2) were true, are you sure the optimal solution should have had this process active? In other words, is there some economic incentive for using it?  I remember that earlier, you have had similar issues with zero process activities because there was no incentive or constraint making them active.
It is a bit hard for me to guess what is happening in your model wi

### 15. stock!!

**Asked by:** maria | **Forum:** VEDA FE - Questions and Observations | **Thread:** [103](../../raw/forum/threads/103.json) | **Posts:** 62

**Question:**
> Good morning again!!
My model is running!!haha
But I have a new problem now. I would like to give the model the capacity installed in the base year and give it to decide if install or not new capacity in the following years. The problem is that when I use the parameter prc_resid the model doesn't install new capacity.
Is there a way to do this??
Thanks again!

**Answer** (by Antti-L):
> Yes, there is a way to do this.
When there are RESIDs in the Base templates, VEDA-FE automatically generates NCAP_BND parameters with interpolation option 2, and these are causing the zero upper bounds for the new capacity. In a scenario file, you can change these NCAP_BND interpolation options to zero values.  For example, if the processes for which you wish to allow new capacity have names E*00 and IE*00, you could use the following TFM_INS table:
(Note that TFM_UPD cannot be used here, because it does not update interpolation options).
Indeed, you could also use NCAP_PASTI for defining the 

### 16. G_DYEAR - Base year for discounting

**Asked by:** AKanudia | **Forum:** Notice Board | **Thread:** [22](../../raw/forum/threads/22.json) | **Posts:** 60

**Question:**
> This parameter has been
hard-wired
into the RUN file template since the beginning. Starting in version
4.3.307
, it can be specified via the VEDA tables. I suggest you include this in the SysSettings file, with the Discount rate (G_DRATE) declaration.
If this is not declared, VEDA will declare this as the
start year
(first year of the model horizon) in RUN file.
PS: Thanks to Gary who pointed this

**Answer** (by AKanudia):
> This parameter has been
hard-wired
into the RUN file template since the beginning. Starting in version
4.3.307
, it can be specified via the VEDA tables. I suggest you include this in the SysSettings file, with the Discount rate (G_DRATE) declaration.
If this is not declared, VEDA will declare this as the
start year
(first year of the model horizon) in RUN file.
PS: Thanks to Gary who pointed this out to me

### 17. TIMES-Macro-MSA and gdx behaviour

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

### 18. ENV_ACT troubles

**Asked by:** Neha Jaggeshar | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1571](../../raw/forum/threads/1571.json) | **Posts:** 55

**Question:**
> Hi all,
I have a case of LU emissions, with a “no-harvest” technology that moves land into a stock and I attach emissions using env_act~
. The emission commodities (CO₂, CH₄, N₂O) are defined with type = ENV.
When I include only CO₂ (env_act~CRPSINKCO2) the CO₂ flow appears in results (VAR_FOut).
But when adding values for CH₄ and/or N₂O, the CRPLANDNOHARVEST activity is set to zero in the solutio

**Answer** (by Antti-L):
> I ran the model and it solved fine.  The objective was:
**** OBJECTIVE VALUE          384055.3097
Then I tested by putting the ENV_ACT(AGRCRPCH4), and I did get also the
AGRCRPCH4 emissions
reported in the results. And yes, now I also see why you obtained zero activity and zero emissions:
There was, in fact, no demand for the activity or main output of CRPLANDNOHARVEST, which is CRPLAND_Stock. I verified that by putting a zero upper bound for the activity of that process, and solving again. The model solved fine and the objective value was the same as before!
**** OBJECTIVE VALUE          3840

### 19. Missing values of Base Year commodities in VEDA-BE

**Asked by:** Tanzeel | **Forum:** VEDA BE - Questions and Observations | **Thread:** [508](../../raw/forum/threads/508.json) | **Posts:** 55

**Question:**
> I have a little problem of missing values of some energy carriers like (HFO, GSL) in base year 2015 (GSL is even absent for all model years). By checking gdx file that showed the data perfectly for base year. Sets and Tables are also well established. Some Import processes are not shown in any table even in "exres".

**Answer** (by Antti-L):
> Ok, thanks.
The screenshot shows that you are defining an
upper bound
for the flow of OILGSL of IMPOILGSL.  An upper bound means that the flow is limited to
at most
the value of the bound (108.42). It does not prevent the flow from being zero.
If you want to ensure that there are OILGSL imports of that amount through this process in 2015, you should thus define a
lower bound
or a
fixed bound
instead.
Alternatively, if you think that the imports should occur even without imposing a lower bound, then your cost data for the imports and the competing supply options for OILGSL are not quite correct

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
