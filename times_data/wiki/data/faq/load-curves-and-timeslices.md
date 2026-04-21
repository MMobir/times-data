---
type: faq
title: "FAQ: Load Curves And Timeslices"
aliases: []
tags: [faq, load-curves-and-timeslices]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Load Curves And Timeslices

This page collects frequently asked questions and expert answers about **Load Curves And Timeslices** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 160
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

### 2. Modifying Timeslice and sector definitions

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

### 4. Issues varying COM_FR over years

**Asked by:** SDockweiler | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1596](../../raw/forum/threads/1596.json) | **Posts:** 72

**Question:**
> Dear all
Not used to working with time slices in my model so here goes:
I am trying to model changes in the commodity fraction over time, because we want to mimic the assumption that more and more production of energy services can be done using flexible electric boilers. In the documentation I read that COM_FR is defined for region, timeslice, commodity and datayear (COM_FR(r, datayear, c, s)).
So

**Answer** (by Antti-L):
> You wrote earlier:
>
INDELC being strictly ANNUAL and INDELD being DAYNITE. The SubAnnual scenario file activates the share of INDELD being zero in the VT-base case to be 1 and INDELC to be zero.
Yes I see that, in the
sys_timeslice_10split_*
scenario file, but I note that there is still also INDELC demand remaining for many processes. There seems to be in total 42 processes consuming INDELC (in both regions) while only 10 processes have an INDELD input.
Anyway, your explanation about “
What I would like to model, is flexible operations of industrial electric boilers
” indicates that in essenc

### 5. TSLV for load curve setting

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

### 6. TimesliceTroubleshoot

**Asked by:** xiao.li8@mcgill.ca | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1437](../../raw/forum/threads/1437.json) | **Posts:** 70

**Question:**
> Hi,
I split the daytime into 24 hours (H0, H1, H2...). However, the QA_CHECK.LOG implicates that:
*** User-provided G_YRFR values are not valid year fractions
*01 WARNING      - TS fractions normalized,  (R.TSL.S)=AL.ANNUAL.ANNUAL
*01 WARNING      - TS fractions normalized,  (R.TSL.S)=AL.SEASON.S
*01 WARNING      - TS fractions normalized,  (R.TSL.S)=AL.SEASON.F
*01 WARNING      - TS fractions nor

**Answer** (by Antti-L):
> I think you should explain the purpose of your post: As far as I can see, the three new attachments in your latest post give no new information about your problem. The model is still
proven infeasible
, the reason for which is not shown in your attachments, but which I am sure Cplex does report. If VEDA Online does not give you the GAMS log file, you should use the GAMS OPTION SYSOUT=ON; to get the infeasibility report in the listing fle.
I attach a sample GAMS log file, so that you can see that it contains the full Cplex output. You have not yet shown the GAMS log file (only the TIMES QA log)

### 7. ERRORS IN INPUT DATA/COMPILE

**Asked by:** JozefO | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [919](../../raw/forum/threads/919.json) | **Posts:** 70

**Question:**
> Hello, i reinstall GAMS to lower version because license expiration.
But after SOLVE ther is no RESULT.
I m posting here LST. file from Gams Wrk folder.
Old Veda worked fine with my test model.
______________________________________________________________________________________
GAMS 24.8.5  r61358 Released May 10, 2017 WEX-WEI x86 64bit/MS Windows                                                 

**Answer** (by JozefO):
> Hello, i reinstall GAMS to lower version because license expiration.
But after SOLVE ther is no RESULT.
I m posting here LST. file from Gams Wrk folder.
Old Veda worked fine with my test model.
______________________________________________________________________________________
GAMS 24.8.5  r61358 Released May 10, 2017 WEX-WEI x86 64bit/MS Windows                                                                                                                                                                 12/18/20 12:16:29 Page 8
TIMES -- VERSION 4.1.0
C o m p i l a t i o n
452  OPTION PROFIL

### 8. NCAP_AFC and NCAP_AFA

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

### 9. PCG Observation and question

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

### 10. COM_FR at DAYNITE nott working

**Asked by:** Pacarval | **Forum:** VEDA FE - Questions and Observations | **Thread:** [539](../../raw/forum/threads/539.json) | **Posts:** 65

**Question:**
> Dear Antti,
I am runninng my model with 108 timeslices (12 seasons, 3 weekdays (weekday, saturday, sunday) and 3 day periods (morning, day, night). I have a load curve for the electricity sector with 108 timeslices and for the moment I am using the same load curve for all ELC demands (residential, commercial, industry, etc.). When I use the COM_FR to set the load curve the model only 'reads' 48 ti

**Answer** (by AKanudia):
> Region and TimeSlice definitions (~BookRegions_Map and ~TimeSlices Tags) are read only when SYNC starts from scratch.
So, Tools - Start from scratch should solve the issue for both Pablo and you.

### 11. Model compilation error

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

### 12. Appropriate solve parameter for large model

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

### 13. reporting UC created by VEDA-BE?

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

### 14. NCAP_AFC and seasonal storage

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

### 15. Storage Interpeting In and Out flows

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

### 16. (Pumped) Storage modelling

**Asked by:** Antti-L | **Forum:** VEDA FE - Questions and Observations | **Thread:** [506](../../raw/forum/threads/506.json) | **Posts:** 61

**Question:**
> Re-post, because my earlier reply to fg's post seems to have disappeared
.
> [fg Wrote:] My task is to integrate pumped hydro storages as STGTSS properly into our model and I've now been reading both through the documentation and a couple of threads here in the forum, but still remain somewhat puzzled.Issue IAccording to my understanding, the termcapacityis unfortunately blurry when it comes to st

**Answer** (by Antti-L):
> Re-post, because my earlier reply to fg's post seems to have disappeared
.
> [fg Wrote:] My task is to integrate pumped hydro storages as STGTSS properly into our model and I've now been reading both through the documentation and a couple of threads here in the forum, but still remain somewhat puzzled.Issue IAccording to my understanding, the termcapacityis unfortunately blurry when it comes to storages, as in literature it can refer both toa) therated power outputof the turbine / input of the pump, measured in e.g.[GW]orb) theamount of energythat can be stored in, measured in e.g.[GWh]Do I un

### 17. Transmission efficiency between regions

**Asked by:** fg | **Forum:** VEDA FE - Questions and Observations | **Thread:** [552](../../raw/forum/threads/552.json) | **Posts:** 61

**Question:**
> In a multi-regional electricity system model, I want to model the interconnectors with a certain transmission efficiency, say 0.98
That why I put into SuppXLS/Trades/ScenTrade_TRADEPARAMETERS.xlsx this line (amongst others)
which is being read into the model very well:
However, the results show that this constraint is not working, as the VAR_Fin and VAR_Fout for two neighbouring regions are exactl

**Answer** (by Antti-L):
> You might want to consider having a look at the documentation, Part II.
The description for COM_IE is: "Overall efficiency applied to the total production of a commodity in the commodity balance equation (EQ(l)_COMBAL)."  I think that makes it quite clear that it does not affect the transformation over processes at all.  And, looking at the equation formulation for EQ(l)_COMBAL in the doc, you can also see in more detail how it is applied.
EFF and CEFF are VEDA parameters, which are translated into the TIMES parameter ACT_EFF, as you can see from VEDA-FE Basic Functions → Browse → TIMES view. 

### 18. Differences between VAR_FOut and VAR_POut

**Asked by:** Hesam | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1330](../../raw/forum/threads/1330.json) | **Posts:** 60

**Question:**
> Dear all,
Could someone please clarify the distinctions between the attributes var_fout and var_pout? If var_fout remains constant while var_pout changes over a period, what implications does this have for a power generation technology?
Best,
Hesam

**Answer** (by Antti-L):
> I am sorry but the Excel file is not very readable.  Below is an excerpt from the top:
"Scenario ModelName Studyname Attribute Commodity Process Period Region Vintage Timeslice Userconstraint Pv"
"bau_a12_highdumimpcost EU_TIMES_Veda2.0-master pilot_runs Val_Flo ELCHIG ENSI_KRSKO-2 2050 SI 2050 - - -705.3376893"
"bau_a12_highdumimpcost EU_TIMES_Veda2.0-master pilot_runs Val_Flo ELCHIG TB_ELCHIG_HU_SI_01 2050 SI 2050 - - 53.46137465"
"bau_a12_highdumimpcost EU_TIMES_Veda2.0-master pilot_runs Val_Flo ELCHIG TRAGH2C04 2060 SI 2060 - - 1.052055454"
"bau_a12_highdumimpcost EU_TIMES_Veda2.0-master p

### 19. Modeling part loads

**Asked by:** pankaj | **Forum:** VEDA FE - Questions and Observations | **Thread:** [679](../../raw/forum/threads/679.json) | **Posts:** 60

**Question:**
> Hi everyone,
I am using a model with 3 seasons, 24 hour timeslices and I have modeled part load operations using the following parameters
ACT_LOSPL~FX     0.075
ACT_CSTPL            89
ACT_LOSPL~LO     0.55
ACT~LOSPL~UP     0.9
ACT_MINLD             0.55
ACT_UPS~UP         0.6
ACT_UPS~LO         0.6
ACT_CSTUP           0.065
ACT_TIME~LO       24
For validation I took the inputs and outputs and cal

**Answer** (by Antti-L):
> Thanks for providing the model files.
I was able to reproduce your results, and found out that the problem with your partial load efficiencies was caused by defining the ACT_EFF parameters on the PG flow, instead of the
shadow side flows
. The documentation says it clearly:
"
…the endogenous modelling of partial load efficiencies requires that the process has its efficiency modelled through the ACT_EFF parameter (on the shadow side of the process).
"
I corrected this modeling flaw (by using ACT_EFF(NRG)), and immediately got reasonable results:
• The efficiencies decline as defined under parti

### 20. Storage modelling, timeslice resolution and G_CYCLE

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
