---
type: faq
title: "FAQ: Installation And Setup"
aliases: []
tags: [faq, installation-and-setup]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Installation And Setup

This page collects frequently asked questions and expert answers about **Installation And Setup** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 527
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

### 3. New in VEDA FE 4.3.1

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

### 4. Problem with version 4.3.33

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

### 5. Error Installing VEDA-FE

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

### 6. Cost benefit and Ranging

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

### 7. FE Case Manager

**Asked by:** Gargiulo | **Forum:** VEDA FE - Suggest New Features | **Thread:** [72](../../raw/forum/threads/72.json) | **Posts:** 160

**Question:**
> In the Beta version it is introduce in the Case Manager the scenario type (color code and letter). In some cases should be useful to click on the scenario type and select all the similar scenario in one click.
Thanks Mauri

**Answer** (by Gary):
> Amit,
As you know I'd like to see an export/import Case and Batches facility as well, owing to the number of analysts we have working on our models.
Thanks,
Gary

### 8. A new worksheet VNTG in VFE

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

### 9. fixom/varom

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

### 11. Capacity units in gdx/dd files vs veda

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

### 14. Reproducing Model Run Errors

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

### 15. Unnormal results

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

### 16. Tradeoff for user-defined objective function

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

### 17. SYNC and size of the FE window

**Asked by:** OlivierD | **Forum:** VEDA FE - Questions and Observations | **Thread:** [696](../../raw/forum/threads/696.json) | **Posts:** 71

**Question:**
> Hi,
This occurs in a new VEDA (FE&BE) installation (installed yesterday) with Trial Version Licence on a laptop with WINDOWS 10. The version installed is VFE 4.5.2001
When using "SYNC" in VEDA_FE the "FE window" becomes automatically smaller as well as the contents and all fonts in the windows; I would say that everything is reduced to half size.
In the mean time all functions are still working an

**Answer** (by AKanudia):
> Yes, another user has reported the same behavior last week, but we haven't been able to reproduce it at our end. are you using multiple monitors?

### 18. Items Detail Bug

**Asked by:** zhangshu | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1035](../../raw/forum/threads/1035.json) | **Posts:** 70

**Question:**
> Hi!
I'm using the latest version of VEDA2 and I found that after clicking the items of items detail several times, the row height of the data pivot table gets smaller and smaller, and finally it becomes impossible to see.
Meanwhile, I found that the MasterFormSettings.json file in the model folder where for the values of row height and filter height will decrease by 2 for each click, and will even

**Answer** (by AKanudia):
> We know that. The question is only because we will send you an update for the installation type that you are using. This problem is specific to Chinese Windows.

### 19. Is there a way to adjust to the VTrun.cmd file generated when pressing solve in Veda?

**Asked by:** kristofferand | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1143](../../raw/forum/threads/1143.json) | **Posts:** 70

**Question:**
> [font=Monaco, Menlo, Consolas, "Courier New", monospace]Is there a way to adjust to the VTrun.cmd file generated when pressing solve in Veda?
I would like to include a gams times-report-script at the end of the VTrun.cmd file after the GDX2VEDA GAMSSAVE line.
The purpose of the gams times-report-script is to collect all relevant output from TIMES in long format, i.e. all attributes and dimensions 

**Answer** (by AKanudia):
> Thanks for this request. We have already made it possible to write GAMS statements in several different locations of the RUN file, at the top/bottom of scenario DD files, and pass GAMS switches to the GAMS call statement in the VTrun.CMD file. See the *cmd* attributes. We can create another parameter to serve your purpose. Can you upload a CMD file with an example of the statement you wish to add?

### 20. problem with kre storage

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
