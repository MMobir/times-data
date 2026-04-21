---
type: faq
title: "FAQ: Renewables And Availability"
aliases: []
tags: [faq, renewables-and-availability]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Renewables And Availability

This page collects frequently asked questions and expert answers about **Renewables And Availability** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 280
**Top Q&As shown:** 20

---

### 1. Error Installing VEDA-FE

**Asked by:** SofiaSimoes | **Forum:** VEDA Install - Questions and Observations | **Thread:** [27](../../raw/forum/threads/27.json) | **Posts:** 286

**Question:**
> After installing VEDA from scratch I got the error message below. After that error message Path error 76 and VEDA collapses.
Any suggestions on how to deal with it?
Microsoft OLE DB Provider for ODBC Drivers
-2147217911
[Microsoft] [Microsoft ODBC Access Driver] Cannot modify the design of a table 'Error_Table'. It is a read-only database.

**Answer** (by AKanudia):
> Looks like something has gone wrong during the installation.
Is VEDA installed in a VEDA folder in the root, or under Program files? If not in root, then please try uninstalling (from the control panel) and reinstalling in root.
Before reinstalling, follow the special instructions "
If using VISTA or Win7
" that are given in the Installation section of the VEDASupport site
here
.

### 2. Export to Excel

**Asked by:** olexandr | **Forum:** VEDA FE - Questions and Observations | **Thread:** [50](../../raw/forum/threads/50.json) | **Posts:** 200

**Question:**
> I have difficulties exporting data to excel when I am using Browse in TIMES view. Basically, from time to time not all of the data is exported: the indentifiers are there but starting from a certain line all the data is missing (see the file:
uploads/43/WindConstraints.zip
). Is there any strategy for avoiding this?

**Answer** (by AKanudia):
> We are not able to reproduce the problem, but believe you
.
Try the two other export routes that appear when you right click in the data area: Copy (clipboard) and Export to Excel. Their behavior will help us diagnose the problem.

### 3. Problems with RES

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

### 4. Error 170 Domain violation for element

**Asked by:** BrageAG | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1024](../../raw/forum/threads/1024.json) | **Posts:** 75

**Question:**
> Hello,
I've been having this issues with new veda and model.
Coudnt attach log files.
--------------------------------------------------------
Application Name: Veda2.0 - Installer - 1.231.1.5
Machine Name: LAPTOP-RKU8BSRV
User Name: brage
User Domain Name: LAPTOP-RKU8BSRV
Windows OS: Microsoft Windows 10 Home
Region: US - United States
Language: English (United States)
Current Culture: en-US - En

**Answer** (by Antti-L):
> Looks like your
SysSettings.xlsx
and
100-mediumcost_ts.dd
are from a different model version, as the timeslices are defined differently (the
hour ranges
are different).  Moreover, I can see that your
100-mediumcost_ts.dd
has a timestamp from April 27th, while your listing file was much newer, May 7th.  They should have the same date if taken from the same run.
Anyway, assuming that the
SysSettings.xlsx
you provided is the current version, it shows that you have used invalid timeslices in the two scenarios:
• trade_prices_allbnk_208_2021-04-26.dd
• 0_profile_com_208.dd
So, you should try checki

### 5. NCAP_AFCS parameter not recognized

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

### 6. VEDA2 Question

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

### 7. How do I add additional element to prc_grp?

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

### 8. Tradeoff for user-defined objective function

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

### 9. SYNC and size of the FE window

**Asked by:** OlivierD | **Forum:** VEDA FE - Questions and Observations | **Thread:** [696](../../raw/forum/threads/696.json) | **Posts:** 71

**Question:**
> Hi,
This occurs in a new VEDA (FE&BE) installation (installed yesterday) with Trial Version Licence on a laptop with WINDOWS 10. The version installed is VFE 4.5.2001
When using "SYNC" in VEDA_FE the "FE window" becomes automatically smaller as well as the contents and all fonts in the windows; I would say that everything is reduced to half size.
In the mean time all functions are still working an

**Answer** (by AKanudia):
> Yes, another user has reported the same behavior last week, but we haven't been able to reproduce it at our end. are you using multiple monitors?

### 10. VEDA-FE comments and suggestions

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

### 11. VEDA ignoring data in Excel spreadsheets when formatted in certain ways

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

### 12. Errors when attempting stochastic run

**Asked by:** NeilGrant | **Forum:** VEDA FE - Questions and Observations | **Thread:** [857](../../raw/forum/threads/857.json) | **Posts:** 70

**Question:**
> Dear community,
I have been trying to implement a stochastic run in TIAM, where the availability of carbon dioxide removal is uncertain.
I have explored the Advanced Demos on stochastic runs, and have tried to implement a stochastic scenario file in the same manner. It's a simple two-stage set-up, where in the second stage CDR is available with a probability of 50%. Please see the attached file fo

**Answer** (by Antti-L):
> Ok, thank you for the model input files. I tested running the model instance you provided, and immediately saw that there were problems:
1)  When running with the old TIMES v4.2.7, I can see
two
GAMS compile errors in the equation EQL_COMCES (which was introduced in v4.2.3). These errors appear only when using TIMESED with STAGES (i.e. a stochastic run with elastic demands), and the errors were caused by not having made that new equation fully stochastic-aware. This small bug in the code was subsequently fixed in TIMES v4.3.1 (in February 2019).
2) However, your listing file shows a lot of mor

### 13. ERRORS IN INPUT DATA/COMPILE

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

### 14. NCAP_AFC and NCAP_AFA

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

### 15. Microsoft JET Database Engine 2147217904

**Asked by:** Kannan | **Forum:** VEDA BE - Questions and Observations | **Thread:** [152](../../raw/forum/threads/152.json) | **Posts:** 68

**Question:**
> Hi Amit
A colleague installed TIMES VEDA in a new PC with windows 7 (German version).
While we were trying to view results in VBE, the following error (from log file) has been reported.
Could you please help to fix it?
Thanks
Kannan
Version: 4.8.74
12.05.2011 14:16:35
Error in procedure frmSaveTable.SaveThisTable
Source = Microsoft JET Database Engine
Number = -2147217904
Description = Für mindest

**Answer** (by Antti-L):
> For me, the date format problem, which was fixed in 4.8.7422 is now back, after upgrading to 4.8.75.
The temporary table names now again contain the date separators (dots), and that leads to the message "Invalid Table Name!" every time I try to view a new temporary table.
Why is that?  I would think it would have been a good idea to include the fix also in the Release, wouldn't it?
So I guess I have to roll back to 4.8.7422, or do you think that I should give up and consent to using the U.S. date format?
PS: This issue was originally reported and described here:
http://forum.kanors-emr.org/sho

### 16. Model compilation error

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

### 17. Subsidies

**Asked by:** SAO | **Forum:** VEDA FE - Questions and Observations | **Thread:** [904](../../raw/forum/threads/904.json) | **Posts:** 65

**Question:**
> Dear all,
Could you please help to figure out how to limit the maximum amount of subsidies available for specific period and for different technologies?
I have diferent wind and solar technologies for which subsidies are available (see in attached file)
Total amount of subsidies for wind and solar technolgies is 750 000 in TOTAL.
Period for subsidies is 2025 – 2030. Theres is no limit to the amoun

**Answer** (by Antti-L):
> There are several different ways of limiting the maximum amount of subsidies available for specific period and for different technologies, depending on what is exactly the desired formulation of the constraint. 1) One can use REG_BNDCST for limiting the total amount of annual subsidy payments in a any given region and period. 2) One can use REG_CUMCST (as in your scenario file) for limiting the cumulative amount of annual subsidy payments in a given region within a range of years. 3) One can use the user constraint modifier SUB for referring to the lump-sum investment subsidies in any period, 

### 18. exception while connecting

**Asked by:** suxin_thu | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [941](../../raw/forum/threads/941.json) | **Posts:** 65

**Question:**
> Hi~ I am trying to using Veda2.0 version 1.205.1.1. I installed the program using the Setup file. When I open veda 2.0 the first time. it says "We are not able to establish database connection". Then I tried to import the DemoS_012, it says "Exception while connecting".  Seems that I did not install the program properly or I did not install some required software?

**Answer** (by Ravinder):
> > [(10-09-2022, 09:25 PM)O.Broad Wrote:] Hi Ravinder,I'm writing as I am having a similar problem as the one described above. I have checked the steps that you describe above and PostgreSQL 10 is installed, the Veda-db service is stopped. Starting manually does not work as it simply stops again.Note that this is a new issue, the system worked fine yesterday and is now running into this problem.Could you detail the steps required to give the permissions required - though since things were working fine yesterday I am not sure what could have caused these permissions to be altered.Any other point

### 19. How to set UCs for the share of power generation capacity?

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

### 20. Levelised cost calculation

**Asked by:** Mahmoud | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1112](../../raw/forum/threads/1112.json) | **Posts:** 63

**Question:**
> Dear all,
I have a question about the calculation of levelized costs in TIMES. I am defining the following technology:
Sets: PRE
TechName:SNK_DAC (direct air capture process)
Tact: kt
Tcap: kt-year
With the following characteristics:
TechName: SNK_DAC
Comm-IN: TOTCO2Net (CO2 emissions from power generation and hydrogen production), ELC (power), HET (heat)
Comm-OUT: CO2Captured (CO2 captured define

**Answer** (by Antti-L):
> Ahh... ok, yes, then the price of the main output (captured CO2) is then not included.
But in your case the tax apparently is, in fact, reflected in the price of the input commodity (TOTCO2Net), which I guess must be negative. In other words, unlike for normal processes, where the inputs have costs, in your case the price of he input is negative, and so you actually get revenues (tax reduction/refund) from consuming the input TOTCO2Net. Maybe you can confirm that?
I think that would explain the negative levelized cost equally well, no?  BTW: What is the price of the captured CO2?
[Edit:] Ah...
