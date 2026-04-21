---
type: faq
title: "FAQ: Errors And Debugging"
aliases: []
tags: [faq, errors-and-debugging]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Errors And Debugging

This page collects frequently asked questions and expert answers about **Errors And Debugging** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 370
**Top Q&As shown:** 20

---

### 1. New in VEDA FE 4.3.1

**Asked by:** AKanudia | **Forum:** VEDA FE - Questions and Observations | **Thread:** [5](../../raw/forum/threads/5.json) | **Posts:** 289

**Question:**
> ·
A lot faster and more robust with a lot of data processing logic and query optimization
·
RES view has been redone:
o
Now it shows UCs that are linked with processes/commodities
§
Dbl-Clicking the UC shows all the intersecting processes/commodities
o
The main browse form has been integrated in this view.
§
All browse functionality is available here via the "T" and "V" icons on the RES menu bar.


**Answer** (by AKanudia):
> ·
A lot faster and more robust with a lot of data processing logic and query optimization
·
RES view has been redone:
o
Now it shows UCs that are linked with processes/commodities
§
Dbl-Clicking the UC shows all the intersecting processes/commodities
o
The main browse form has been integrated in this view.
§
All browse functionality is available here via the "T" and "V" icons on the RES menu bar.
·
The process/commodity master forms have been improved
o
Element counts appear below the lists
o
"Back" button added on the form (bottom left)
o
The region combo holds its value across clicks and ses

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

### 3. Error Installing VEDA-FE

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

### 4. Export to Excel

**Asked by:** olexandr | **Forum:** VEDA FE - Questions and Observations | **Thread:** [50](../../raw/forum/threads/50.json) | **Posts:** 200

**Question:**
> I have difficulties exporting data to excel when I am using Browse in TIMES view. Basically, from time to time not all of the data is exported: the indentifiers are there but starting from a certain line all the data is missing (see the file:
uploads/43/WindConstraints.zip
). Is there any strategy for avoiding this?

**Answer** (by AKanudia):
> We are not able to reproduce the problem, but believe you
.
Try the two other export routes that appear when you right click in the data area: Copy (clipboard) and Export to Excel. Their behavior will help us diagnose the problem.

### 5. Life Update

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

### 6. start year with different period definition

**Asked by:** dvanre | **Forum:** VEDA FE - Questions and Observations | **Thread:** [63](../../raw/forum/threads/63.json) | **Posts:** 160

**Question:**
> I have a problem with my model when running with different periods definition because of a lower bound on electricity heating in residential sector. The model is calibrated for 2005 and the new technologies for electric heating start in 2006. When I run the model with as milestone year 2005 (1year) 2006(2years) 2010(5years) ,everything goes fine but when I run with 2005 (2years) 2010(7years) I get

**Answer** (by Antti-L):
> Yes, according the original design in TIMES, PRC_NOFF considers the technology unavailable in a period whenever the milestone year of the period is inside the OFF range. But since version v3.0.1 you have been able to change the meaning of PRC_NOFF, such that it will consider a technology unavailable in a period only if the full period is covered by the OFF range.
You can change the meaning of PRC_NOFF by using the new parameter G_OFFTHD(y)=1, where y stands for the year, starting from which the interpretation should be changed. The year index was included in the parameter, because normally one

### 7. Problems with RES

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

### 8. importing results

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

### 9. A new worksheet VNTG in VFE

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

### 10. Error 170 Domain violation for element

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

### 11. NCAP_AFCS parameter not recognized

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

### 12. Reducing files

**Asked by:** Ceas19 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1253](../../raw/forum/threads/1253.json) | **Posts:** 75

**Question:**
> Hello everyone,
My TIAM model has an excel file for each region (16) and for each sector (5) so in total 80 files. So I wanted to reduce the industrial files just to one. I started by creating a new file just with two regions to observe if the file works, so it did, the model turned well. Then I continued to add all the other regions, and after doing that and turning the model I received error 172

**Answer** (by AKanudia):
> Apologies for the delay. The assumption that one region will appear in only one super-region is rather deep in the code. However, we realized that you can model Industry as a SubRES to accomplish what you are trying to do.
The only thing to remember is that all regional data must come from the SubRES trans file. You cannot use regions in FI_T tables of SubRES files.
Feel free to seek clarifications on this suggestion.

### 13. VEDA2 Question

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

### 14. Issues in Scaling the Model

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

### 15. Reproducing Model Run Errors

**Asked by:** O.Broad | **Forum:** VEDA FE - Questions and Observations | **Thread:** [698](../../raw/forum/threads/698.json) | **Posts:** 75

**Question:**
> Hello,
I am using UKTM and am trying to reproduce model run results from July this year. The results do not match.
As far as I can tell:
- input (scenario) files are the same and their contents is identical
- CPLEX options are identical
- VEDA_FE options are the same (control panel)
- GAMS_SRCTIMES is the same in both cases
I did however update VEDA_FE, VEDA_BE, GAMS/Cplex between runs - I will be

**Answer** (by Antti-L):
> > [(07-12-2018, 06:09 PM)O.Broad Wrote:] input (scenario) files are the same and their contents is identical
If the input files are supposed to be identical, then you should not see any (relevant) differences, and the diff file produced by GDXDIFF should be nearly empty.  And so, if you see any differences, they should give you the explanation e.g. to the different number of equations, non-zeros, etc, assuming that the RUN file options are identical.  However, the RUN file switches/options might also be at play, if they could have been changed, but I guess that should be less likely.
[
EDIT
:]

### 16. Trouble accessing results

**Asked by:** chandra | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1097](../../raw/forum/threads/1097.json) | **Posts:** 72

**Question:**
> Hello,
I was executing a case in Run Manager in Veda 2.0 My C Drive got full and my run ended abruptly. I re-synchronized the files, and restarted the run. But when I am trying to access results, I am getting the error message "relation files_master does not exist". I clicked the refresh data under tools tab in results, then I am getting the error message "null values cannot be formatted as an SQL

**Answer** (by Antti-L):
> The error in the listing file is actually:
282  Unable to open include file
Meaning that the TIMES source code cannot be found at all, from the folder VEDA is pointed to.
So, the error message "$Abort "You need to use TIMES v2.3.1 or higher" is of course valid in the sense that no TIMES code is being used at all.  But that message,
which is generated by VEDA
, is a bit misleading, and so I would suggest that it could be improved to describe the problem more accurately.

### 17. Issues varying COM_FR over years

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

### 18. TimesliceTroubleshoot

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

### 19. VEDA-FE comments and suggestions

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

### 20. Intermediate nonoptimal

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
