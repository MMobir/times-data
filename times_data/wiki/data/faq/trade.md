---
type: faq
title: "FAQ: Trade"
aliases: []
tags: [faq, trade]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Trade

This page collects frequently asked questions and expert answers about **Trade** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 352
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

### 2. Extremely high marginal costs on CO2 constraint

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [76](../../raw/forum/threads/76.json) | **Posts:** 290

**Question:**
> Dear Antti, Amit, et al.,
I've been struggling the past couple of days trying to understand why my CO2 prices are so high in the later model periods.  I'm reading off the "EQ_CombalM" values for CO2, for which I specify annual caps that decrease over time.  The caps are formulated using the "COM_BNDNET" attribute.  The CO2 prices gradually rise over time to $100-200/tonne, depending on the scenari

**Answer** (by Antti-L):
> David:
I would have to be given the exact definitions of "organic" and "mechanic" problems to comment on that particular qualification by Amit.
However, I think that the marginal cost of 10,000 USD/tonne is very high indeed, and I would not expect to get such high costs in my models.  The symptoms you have described lead me to suspect that you may have modeled some constraint(s) (e.g. user constraints or market-share constraints) that don't work well anymore in the context where the emissions should be very tightly constrained.  In other words, I suspect that some of the constraint(s) you have

### 3. Export to Excel

**Asked by:** olexandr | **Forum:** VEDA FE - Questions and Observations | **Thread:** [50](../../raw/forum/threads/50.json) | **Posts:** 200

**Question:**
> I have difficulties exporting data to excel when I am using Browse in TIMES view. Basically, from time to time not all of the data is exported: the indentifiers are there but starting from a certain line all the data is missing (see the file:
uploads/43/WindConstraints.zip
). Is there any strategy for avoiding this?

**Answer** (by AKanudia):
> We are not able to reproduce the problem, but believe you
.
Try the two other export routes that appear when you right click in the data area: Copy (clipboard) and Export to Excel. Their behavior will help us diagnose the problem.

### 4. Problems with RES

**Asked by:** helenefoeyn | **Forum:** VEDA FE - Questions and Observations | **Thread:** [36](../../raw/forum/threads/36.json) | **Posts:** 140

**Question:**
> I'm having problems with RES and the function that I can view data for technologies I select in RES.
Yesterday I had problems as well. Browse would open on top of the RES window every time, but then I managed to solve it by adjusting the size of the RES and the Browse/data windows and aligning them. It sort of "fixed itself", and the data viewing funtion worked fine. It also worked fine when I sta

**Answer** (by Antti-L):
> I can confirm this feature.  It appears whenever you select
All
from the Region drop-down box:
In addition, also the Process Master shows WIN as both Input and Output to the process when you select ALL regions from the left pane.
However, because MINWIN0 is modeled as a
Trade process
, WIN is actually exported from the MINRNW region and imported to each of the internal regions. Therefore, this is the correct representation of the RES, when all regions are selected (including the external regions). Nonetheless, one might wonder whether All should actually mean only all
internal
regions, so that

### 5. importing results

**Asked by:** maria | **Forum:** VEDA FE - Questions and Observations | **Thread:** [80](../../raw/forum/threads/80.json) | **Posts:** 140

**Question:**
> When starting to import results into VEDA-BE, after choosing the desired scenario to import, an error message turns up in my screen.
It's the first time I run TIMES and my scenario is TIMES_DEMO.
The error report is:
DAO.tableDefs
3441
The field delimiter of the text file matchs with the decimal delimiter or the text delimiter.
If someone has have the same problem or know how to solve it...
Thanks

**Answer** (by AKanudia):
> The easiest way to fix this is to use "English US" (or UK) as the language that decides number formats. This is available under Control Panel - Regional Options. Let me know your OS if you can't find this option quickly.
A more elegant solution will be available soon.

### 6. FLO_share

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

### 7. A new worksheet VNTG in VFE

**Asked by:** Kannan | **Forum:** VEDA FE - Questions and Observations | **Thread:** [35](../../raw/forum/threads/35.json) | **Posts:** 80

**Question:**
> Hi Amit
I created a new SubRes scenario with a set of technologies.
After SYNC, I noticed that a new parameter IBOND(BD)~FX has been generated
automatically
for a selected number of technologies in three periods.
This new parameter is shown in an unknown worksheet ‘VNTG’
When I tried to edit, it shows a message “Pending contact at
Amit@KanORS.Com
” .
Could you please advice me, how this new parame

**Answer** (by AKanudia):
> Thanks for this post Kannan.
This exposes an old feature of VEDA that is rather hidden and (too) succintly described on VEDASupport:
automatic creation of vintage bounds
. This facility was made in the MARKAL days where full vintaging was not supported by the GAMS code.
Look for
Vintage Bounds
under SysSettings in the Template basics - Files section of VEDASupport.
What you need to do
: uncheck the
Generate Vintage Bounds
option under import settings in user options and reimport your SubRES.

### 8. How do I add additional element to prc_grp?

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

### 9. Tradeoff for user-defined objective function

**Asked by:** Sandro_Luh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1192](../../raw/forum/threads/1192.json) | **Posts:** 73

**Question:**
> Dear VEDA community
I am trying to use the tradeoff-function (based on this
documentation
) to implement a user-defined objective function. I adopted the example provided in
this forum thread
for my needs.
While my model produces results and the tradeoff seems generally to work, not everything is 100% clear to me and some things work differently than I expected. I cannot attach my testmodel as it 

**Answer** (by Antti-L):
> Sorry about failing to address explicitly your questions in the above. Please find some attempts below:
>
1. Do I understand this correctly?
Yes, for the
set-up C
that you were using, I'd say your understanding is correct.
>
2. How can I adjust the model, so it optimizes in the end OBJZ but keeps the OBJ_TIME constant from the simulation 5?
That is not possible. In the
set-up C
you were using, in phase 2 you can define deviation bounds for the OBJ or any UC constraints only in relation to the same SOW in phase 1. Your "simulation 5" must be referring to the second SOW in phase 2, and so you ca

### 10. LCOE

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

### 11. VEDA-FE comments and suggestions

**Asked by:** Gargiulo | **Forum:** VEDA FE - Suggest New Features | **Thread:** [545](../../raw/forum/threads/545.json) | **Posts:** 70

**Question:**
> Amit,
I think it is a good idea and I try to start with some comments/suggestions. I hope other users will follow up with, this is an important step for all of us.
Thanks,
Maurizio
VEDA-FE and templates general updates
1. SysSetting
a. Other indexes column in TFM tables
i. If we type OtherIndex we don’t get the error message after SYNC.
2. If we create manually a SubRes or we delete the Subres_
_T

**Answer** (by AKanudia):
> A comment about renaming scenarios (or unsync/delete) with right-click on the navigator:
UPD and MIG tables make this very difficult to do. Let's say you have scenarios A, B, C and D, where each one is using seed values from the previous scenario (in UPD/MIG) tables. If I renamed C to Ac, then not only do I have to re-import Ac, but B and D as well, as the seed values they see might change. Similarly, if I delete C, then I have to re-import all scenarios that are using seed values from this one.
It is not perfect, but VEDA helps you with this interdependence after you mark a file for reprocess

### 12. VEDA ignoring data in Excel spreadsheets when formatted in certain ways

**Asked by:** pedodds | **Forum:** VEDA FE - Questions and Observations | **Thread:** [546](../../raw/forum/threads/546.json) | **Posts:** 70

**Question:**
> I'm using Veda-FE v4.5.4 and Office 2016.
Veda-FE ignores or truncates data in some cells in tables that have particular cell formats.  Examples:
"BY_Trans", worksheet "ELC Trans Tables", cells I9:I11 - custom format ignored.
"SubRES_NewELC_Trans", worksheet "Min AF", cells I9:I12 - custom format and % format both ignored.
"Scen_SCEN_RSR_FF-Price-High", worksheet "UPD", cells I52:I375 - data are t

**Answer** (by Antti-L):
> Interesting!  Although I am not affiliated with Kanors, I have a comment, too:
I guess you mean by "custom format ignored" the opposite, that the
custom format is in fact affecting the result
when importing the file into VEDA-FE?
I tested the SubRES_NewELC_Trans case both with the Excel 2003 format (.xls), and with the .xlsx and .xlsb formats with Excel 2010, and with two different VEDA versions.  In all cases, the Excel 2003 format (.xls) was imported correctly, i.e. all the NCAP_AFA values were imported exactly as the numerical values in the cells, regardless of the custom display format.  H

### 13. Intermediate nonoptimal

**Asked by:** saleh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [601](../../raw/forum/threads/601.json) | **Posts:** 70

**Question:**
> After running my model I get the attached message, GAMS basically says "Solution available but not proven optimal due to numerical difficulties", do you have any idea what I should do and how I can debug my model? I get this message after changing a small things, however, since we have dummy variables I think the model should solve and give me dummy imports wherever the problem is.
Thanks!

**Answer** (by Antti-L):
> At the start of the thread you said:
"…however, since we have dummy variables I think the model should solve and give me dummy imports wherever the problem is."
Consequently, I understood that you would like to obtain the solution, so that you can investigate yourself where the problem is.
But now you are asking about the cause of the problem and how you can debug it. However, we had a similar discussion already in February 2016, where I also already gave my answers to it.  See here:
Solution is available, but not proved optimal
I think the answers I gave then remain valid to your current prob

### 14. Modeling transmission lines in multi-regional models

**Asked by:** saleh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [498](../../raw/forum/threads/498.json) | **Posts:** 67

**Question:**
> Hi,
I am developing a multi-regional electricity dispatch model. The commodity that can be traded between different regions is electricity. I defined transmission lines as bi-directional trade links between regions. I think I can define each link (transmission line) capacity and cost using ScenTrade_Trade_PARAM.xls, however, I am wondering how I can model capacity addition for each transmission li

**Answer** (by Antti-L):
> Ahh…, sorry again, I overlooked the fact that you are defining the G_YRFR on multiple timeslice levels! In fact, you are defining them on all levels, including the ANNUAL level. That is quite unusual, as most users define the year fractions only on the finest level, typically the DAYNITE level.  The fractions on the other levels are then implicitly defined to be the sums of the fractions of the timeslices below each higher level timeslice, which is easy and consistent.
But, as you have pointed out earlier, the user obviously must have had some purpose for defining the values on multiple levels

### 15. VEDA-BE files

**Asked by:** kramea | **Forum:** VEDA FE - Questions and Observations | **Thread:** [112](../../raw/forum/threads/112.json) | **Posts:** 66

**Question:**
> Will VEDA-BE be automatically generated once the case manager is run in VEDA-FE? In the new version of VEDA-FE, I am not able to find .VD or .VDE files along with the other files generated (.lst, .run etc.) after the case manager run.
Can you help me what is going wrong here? Or how do I need to import files for VEDA-BE, since it is not recognizing new runs?
Thanks!
-Kalai

**Answer** (by Antti-L):
> As the screen shot from the GAMS_WRKTIMES folder shows, you have also an
older version
of GDX2VEDA (2005-10-07), which is getting invoked from the GAMS_WRKTIMES folder. Installing a newer version of GAMS would thus not help you at all in this problem, but you should get rid of the old version of GDX2VEDA (which is sitting in the GAMS_WRKTIMES folder, as your screen shot shows). I would suggest to just move the old version of GDX2VEDA to some backup folder, and then try again. The valid version of GDX2VEDA, which is compatible with your GAMS version, would then be found in the path, as demonstr

### 16. Divergent LCOE and marginals

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

### 17. UC not working

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

### 18. Model compilation error

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

### 19. Plausibility check

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

### 20. exception while connecting

**Asked by:** suxin_thu | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [941](../../raw/forum/threads/941.json) | **Posts:** 65

**Question:**
> Hi~ I am trying to using Veda2.0 version 1.205.1.1. I installed the program using the Setup file. When I open veda 2.0 the first time. it says "We are not able to establish database connection". Then I tried to import the DemoS_012, it says "Exception while connecting".  Seems that I did not install the program properly or I did not install some required software?

**Answer** (by Ravinder):
> > [(10-09-2022, 09:25 PM)O.Broad Wrote:] Hi Ravinder,I'm writing as I am having a similar problem as the one described above. I have checked the steps that you describe above and PostgreSQL 10 is installed, the Veda-db service is stopped. Starting manually does not work as it simply stops again.Note that this is a new issue, the system worked fine yesterday and is now running into this problem.Could you detail the steps required to give the permissions required - though since things were working fine yesterday I am not sure what could have caused these permissions to be altered.Any other point
