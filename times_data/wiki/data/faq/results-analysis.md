---
type: faq
title: "FAQ: Results Analysis"
aliases: []
tags: [faq, results-analysis]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Results Analysis

This page collects frequently asked questions and expert answers about **Results Analysis** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 718
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

### 4. Cost benefit and Ranging

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

### 5. Modifying Timeslice and sector definitions

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

### 9. Zeros in tables

**Asked by:** hawkez99 | **Forum:** VEDA BE - Questions and Observations | **Thread:** [100](../../raw/forum/threads/100.json) | **Posts:** 80

**Question:**
> Hi there,
Another simple question I'm sure.
I can't get zeros to appear in tables generated by VEDA-BE.  For example I have a commodity which has activity from 2030 onwards, but no activity before that.  The generated table shows only 2030 onwards, but I want it to always show from 2000 onwards (with zeros where there's no data).
Is there any way to do this?
Thanks,
Adam

**Answer** (by Antti-L):
> Well, I am not quite sure if I understand correctly your question.
But anyway, if you mean that you would like to see in the VEDA-BE table all input/output flows, even if the flows are always zero, that has been possible for some time by using an undocumented TIMES reporting feature, which includes topology indicators in a VEDA-BE result attribute.  I have now made this feature more easy to use, as follows:
You can activate the feature by setting $SET RPT_TOP YES;
The topology indicators will then be available in the attribute PAR_Top, having IN/OUT in the UserConstraint dimension, and with ze

### 10. Marginal costs of Commodity Production

**Asked by:** dlmccollum | **Forum:** VEDA BE - Questions and Observations | **Thread:** [53](../../raw/forum/threads/53.json) | **Posts:** 80

**Question:**
> Which parameter in VEDA-BE represents the marginal cost of a particular commodity (say, electricity, or gasoline)?  Is it the "EQ_CombalM" parameter ("Commodity Slack/Levels - Marginals), which shows up when I move to a commodity in VEDA-BE?  Or should I think of this parameter more as the shadow price of the commodity - i.e., in the sense that the objective function would decrease by this value i

**Answer** (by Antti-L):
> In case you would consider the levelised costs concept useful, see the following document:
http://iea-etsap.org/docs/TIMES-Levelized-Cost.pdf
Concerning costs results in general, all the costs and surplus changes included in the objective function are reported by TIMES, both in terms of annualized costs and in terms of cumulative present values. Value flows of each process are also optionally reported. Lump-sum investment costs are also reported, optionally with and without hurdle rate impact. Therefore, I think all the information is available for doing production cost calculations with metho

### 11. UC problem: specify comm share in a FLO

**Asked by:** JM Cayla | **Forum:** VEDA FE - Questions and Observations | **Thread:** [55](../../raw/forum/threads/55.json) | **Posts:** 80

**Question:**
> Good morning,
I would like to model Plug-in hybrid electric vehicles technologies that might produce different types of distances travelled thanks to fuel and electricity.
For each type of commodity-out, the share of electricity is supposed to vary: from 100% for short-distance travels to almost 0% in long-distance travels.
Then I would like to build a set of UC that specify the share of electrici

**Answer** (by Antti-L):
> In an earlier topic in this Forum, there was already an example given for the modeling of a plug-in hybrid vehicle with two inputs (electricity and gasoline) and two outputs (short and long distance travel). In that example, the average annual share of electricity in the inputs was assumed to be fixed to 55%, and the charging was assumed to occur 75% during the night time and 25% during the daytime.
Using this example, one could reasonably easily replace the fixed 55% average share of electricity by a user constraint defining the share to be dependent on the output flows. Assuming that the sha

### 12. Problem with getting result values

**Asked by:** H.yu | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1066](../../raw/forum/threads/1066.json) | **Posts:** 75

**Question:**
> Hello,
I have a problem with running my TIMES model. It seems the files are synchronized without any problem, and it seems I could run the model (it says optimal/normal completion in the Logs section on the Run Manager Module) but the objective value is 0. When I open the Results Module, all the attributes have no values... Has anyone encountered a similar problem? I have attached the model just i

**Answer** (by AKanudia):
> do you have sufficient rights on the folder where Veda is writing DD files? you should see this in your SysSettings.DD file:
$ONEMPTY
$ONEPS
$ONWARNING
$SET RUN_NAME '08111434'
$SET SCENARIO_NAME 'syssettings'
PARAMETER
ACT_COST ' '/
'DIS1'.'2020'.'IMPDEMZ'.'KEURO' 88888
'DIS1'.'2020'.'IMPMATZ'.'KEURO' 22222
'DIS1'.'2020'.'IMPNRGZ'.'KEURO' 22222
/
PARAMETER
G_DRATE ' '/
'DIS1'.'2020'.'KEURO' 0.04
/
PARAMETER
G_DYEAR ' '/
2020
/
PARAMETER
G_YRFR ' '/
'DIS1'.'AUD' 0.123287671232877
'DIS1'.'AUN' 0.123287671232877
'DIS1'.'PED' 0.0205479452054795
'DIS1'.'PEN' 0.0616438356164384
'DIS1'.'SPD' 0.12328

### 13. Costs

**Asked by:** ArmineA | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1130](../../raw/forum/threads/1130.json) | **Posts:** 75

**Question:**
> HI,
Could you please clarify, what is the difference between Reg_ACost and Reg_wobj?

**Answer** (by Gary):
> > [(20-03-2022, 09:25 PM)Antti-L Wrote:] Hi ArmineA:I got from Gary the VD results file for the Armenia model Ref case.>How can I get Reg_wobj (Regional total discounted system cost by component) by period?As mentioned above, for doing that you need to use the following switches:● $SET OBLONG YES● $SET ANNCOST LEVTherun fileI also got from Gary did indeed show that both of these were included, and so the straightforward calculation was extremely accurate. The proportional error between theObjzvalue and the sum of the calculated period-wise total discounted system cost by component was < 0.0000

### 14. Capacity units in gdx/dd files vs veda

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

### 15. Reducing files

**Asked by:** Ceas19 | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1253](../../raw/forum/threads/1253.json) | **Posts:** 75

**Question:**
> Hello everyone,
My TIAM model has an excel file for each region (16) and for each sector (5) so in total 80 files. So I wanted to reduce the industrial files just to one. I started by creating a new file just with two regions to observe if the file works, so it did, the model turned well. Then I continued to add all the other regions, and after doing that and turning the model I received error 172

**Answer** (by AKanudia):
> Apologies for the delay. The assumption that one region will appear in only one super-region is rather deep in the code. However, we realized that you can model Industry as a SubRES to accomplish what you are trying to do.
The only thing to remember is that all regional data must come from the SubRES trans file. You cannot use regions in FI_T tables of SubRES files.
Feel free to seek clarifications on this suggestion.

### 16. Issues in Scaling the Model

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

### 17. FLO_SUB can only be applied on one commodity for the same process?

**Asked by:** MikkelBosack | **Forum:** VEDA FE - Questions and Observations | **Thread:** [621](../../raw/forum/threads/621.json) | **Posts:** 75

**Question:**
> Hi
An observation and perhaps a question if any have solved this?
Anyone what have worked with using the FLO_SUB attribute for one process with serveral input commodities. I have had the experience that when using the attribute this way the subsidy is one applied for one of the commodities, eventhough the process consume different commodities. I was in the believe that the FLO_SUB is working simil

**Answer** (by Antti-L):
> Thanks for providing me the test case.  One of the DD files was missing (elc_windmaxgrowth.dd), but I managed to run the model by commenting it out in the RUN file.
I found out that in the TIMES pre-processing there was indeed a bug, which manifested only when defining both taxes and subsidies on the same process flow at the same time. And you had defined also zero taxes on these input flows. I have fixed the issue now in the code, and tested the model again, and the subsidies were now taken into account correctly even when both taxes and subsidies are defined at the same time.
The fix will be

### 18. Reproducing Model Run Errors

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

### 19. How do I add additional element to prc_grp?

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

### 20. Unnormal results

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
