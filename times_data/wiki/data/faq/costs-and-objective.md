---
type: faq
title: "FAQ: Costs And Objective"
aliases: []
tags: [faq, costs-and-objective]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Costs And Objective

This page collects frequently asked questions and expert answers about **Costs And Objective** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 246
**Top Q&As shown:** 20

---

### 1. Extremely high marginal costs on CO2 constraint

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [76](../../raw/forum/threads/76.json) | **Posts:** 290

**Question:**
> Dear Antti, Amit, et al.,
I've been struggling the past couple of days trying to understand why my CO2 prices are so high in the later model periods.  I'm reading off the "EQ_CombalM" values for CO2, for which I specify annual caps that decrease over time.  The caps are formulated using the "COM_BNDNET" attribute.  The CO2 prices gradually rise over time to $100-200/tonne, depending on the scenari

**Answer** (by Antti-L):
> David:
I would have to be given the exact definitions of "organic" and "mechanic" problems to comment on that particular qualification by Amit.
However, I think that the marginal cost of 10,000 USD/tonne is very high indeed, and I would not expect to get such high costs in my models.  The symptoms you have described lead me to suspect that you may have modeled some constraint(s) (e.g. user constraints or market-share constraints) that don't work well anymore in the context where the emissions should be very tightly constrained.  In other words, I suspect that some of the constraint(s) you have

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

### 4. Marginal costs of Commodity Production

**Asked by:** dlmccollum | **Forum:** VEDA BE - Questions and Observations | **Thread:** [53](../../raw/forum/threads/53.json) | **Posts:** 80

**Question:**
> Which parameter in VEDA-BE represents the marginal cost of a particular commodity (say, electricity, or gasoline)?  Is it the "EQ_CombalM" parameter ("Commodity Slack/Levels - Marginals), which shows up when I move to a commodity in VEDA-BE?  Or should I think of this parameter more as the shadow price of the commodity - i.e., in the sense that the objective function would decrease by this value i

**Answer** (by Antti-L):
> In case you would consider the levelised costs concept useful, see the following document:
http://iea-etsap.org/docs/TIMES-Levelized-Cost.pdf
Concerning costs results in general, all the costs and surplus changes included in the objective function are reported by TIMES, both in terms of annualized costs and in terms of cumulative present values. Value flows of each process are also optionally reported. Lump-sum investment costs are also reported, optionally with and without hurdle rate impact. Therefore, I think all the information is available for doing production cost calculations with metho

### 5. Problem with getting result values

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

### 6. Costs

**Asked by:** ArmineA | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1130](../../raw/forum/threads/1130.json) | **Posts:** 75

**Question:**
> HI,
Could you please clarify, what is the difference between Reg_ACost and Reg_wobj?

**Answer** (by Gary):
> > [(20-03-2022, 09:25 PM)Antti-L Wrote:] Hi ArmineA:I got from Gary the VD results file for the Armenia model Ref case.>How can I get Reg_wobj (Regional total discounted system cost by component) by period?As mentioned above, for doing that you need to use the following switches:● $SET OBLONG YES● $SET ANNCOST LEVTherun fileI also got from Gary did indeed show that both of these were included, and so the straightforward calculation was extremely accurate. The proportional error between theObjzvalue and the sum of the calculated period-wise total discounted system cost by component was < 0.0000

### 7. FLO_SUB can only be applied on one commodity for the same process?

**Asked by:** MikkelBosack | **Forum:** VEDA FE - Questions and Observations | **Thread:** [621](../../raw/forum/threads/621.json) | **Posts:** 75

**Question:**
> Hi
An observation and perhaps a question if any have solved this?
Anyone what have worked with using the FLO_SUB attribute for one process with serveral input commodities. I have had the experience that when using the attribute this way the subsidy is one applied for one of the commodities, eventhough the process consume different commodities. I was in the believe that the FLO_SUB is working simil

**Answer** (by Antti-L):
> Thanks for providing me the test case.  One of the DD files was missing (elc_windmaxgrowth.dd), but I managed to run the model by commenting it out in the RUN file.
I found out that in the TIMES pre-processing there was indeed a bug, which manifested only when defining both taxes and subsidies on the same process flow at the same time. And you had defined also zero taxes on these input flows. I have fixed the issue now in the code, and tested the model again, and the subsidies were now taken into account correctly even when both taxes and subsidies are defined at the same time.
The fix will be

### 8. Unnormal results

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

### 10. Calling VEDA without opening the interface

**Asked by:** anadaker | **Forum:** VEDA FE - Questions and Observations | **Thread:** [673](../../raw/forum/threads/673.json) | **Posts:** 72

**Question:**
> Dear sirs, I wish to run veda from another process that produces the xlsx files in veda format. Once I have all the input files ready, is this possible to call veda-fe directly from another program, or is it mandatory to open the interface and manually synchronize the files?
Best regards, Ana

**Answer** (by AKanudia):
> I am glad that this functionality is proving to be useful.
So far, we have the following requests:
1. to specify the model path
2. to trigger a start from scratch (Olex we should discuss; I am also using GIT and don't need to start from scratch)
3. Selecting the files to be Synced (not sure about this one)
4. Selecting a Case name (that is predefined)
Anything else? Maybe, (optionally) specifying a different case name for the run? Meaning, you load "Case-1", but call it "Case-n" when it actually solves, as you might be updating a scenario file with different kinds of assumptions with some auto

### 11. LCOE

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

### 12. Yearly subsidy expenses not annual investment subsidy

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

### 13. CCS retrofit transition

**Asked by:** ejin | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1189](../../raw/forum/threads/1189.json) | **Posts:** 68

**Question:**
> Hi Antti and community,
I am simulating the decarbonization technologies for the ammonia production. The carbon emission is constrained to be decreased granularly from 2020 to 2050. The result of low-carbon technologies transition look good between 2020 to 2040. In 2045, the major technologies for ammonia production include ATR , ATR with CCS retrofit, ATR coupled with CCS (where the ATR plants bu

**Answer** (by Antti-L):
> Interesting question. You say:
>
It means the system would rather build new ATR coupled CCS plants than retrofitting the existing ATR plants with CCS. This result doesn't make sense because all cost parameters of building the new ATR coupled with CCS plants are larger than those of ATR with CCS retrofit.
First of all, make sure again that you have read the documentation, in particular the following:
● Investing into a retrofit option will never extend the original lifetime of the host process, but investing into a lifetime extension option will extend its lifetime in accordance with the full t

### 14. How to avoid winner-take-all

**Asked by:** guozhi1305 | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1228](../../raw/forum/threads/1228.json) | **Posts:** 67

**Question:**
> Dear all,
I want to know how to avoid winner-take-all. The objective function of the TIMES model is cost optimization, which can impose market penetration or technology share constraints. However, for multiple technologies, if every process is set (such as the transportation sector), there may be some questions such as 1) Not every process can be constrained. And if we add too many constraints, it

**Answer** (by Antti-L):
> >
Whether the TIMES model can be linked with a discrete selection model similar to the GCAM model, and the market share can be calculated based on the cost.
Yes, sure it can.  Some TIMES models and the Markal SAGE algorithm implement market share algorithms comparable to the GCAM modified logit discrete choice model, see below:
As you can see, both the TIMES Ireland model and the Markal SAGE time-stepped algorithm implement market share algorithms that are resembling the GCAM Modified Logit formulation. The CIMS formulation adopted by TIMES Ireland differs from it by employing intangible costs

### 15. Modeling transmission lines in multi-regional models

**Asked by:** saleh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [498](../../raw/forum/threads/498.json) | **Posts:** 67

**Question:**
> Hi,
I am developing a multi-regional electricity dispatch model. The commodity that can be traded between different regions is electricity. I defined transmission lines as bi-directional trade links between regions. I think I can define each link (transmission line) capacity and cost using ScenTrade_Trade_PARAM.xls, however, I am wondering how I can model capacity addition for each transmission li

**Answer** (by Antti-L):
> Ahh…, sorry again, I overlooked the fact that you are defining the G_YRFR on multiple timeslice levels! In fact, you are defining them on all levels, including the ANNUAL level. That is quite unusual, as most users define the year fractions only on the finest level, typically the DAYNITE level.  The fractions on the other levels are then implicitly defined to be the sums of the fractions of the timeslices below each higher level timeslice, which is easy and consistent.
But, as you have pointed out earlier, the user obviously must have had some purpose for defining the values on multiple levels

### 16. simulating technology economies of scale

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

### 17. Preventing early retirements with RCAP_BND

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

### 18. questions about LCOE

**Asked by:** yu03 | **Forum:** VEDA BE - Questions and Observations | **Thread:** [374](../../raw/forum/threads/374.json) | **Posts:** 65

**Question:**
> Hi, I met a problem when i used the back-end of veda. I set a electricity model of china, and i wanted to calculated LCOE (levelized cost of electricity) regarding to capital cost, fuel cost, fix O&M and variables O&M, but I do not know how to calculate the index, are there some materials that introduces the calculate process. thanks for any advice!

**Answer** (by Antti-L):
> Amit is right:  The levelized costs (LEC) calculated by TIMES are calculated from the model results, by process vintage. And if you look at the expression for LEC (see
http://iea-etsap.org/docs/TIMES-Levelized-Cost.pdf
), you can immediately see that if the cumulative discounted output of the main activity is zero, you would get a division by zero.  In other words, LEC is not well-defined (or would be infinite) if the cumulative activity is zero. And the cumulative lifetime activity is inevitably zero for any vintage having a
zero VAR_NCAP
.
One could, of course, think of forcing at least a sm

### 19. Tax credits implementation for low-carbon technologies

**Asked by:** jabarivelisdeh | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1241](../../raw/forum/threads/1241.json) | **Posts:** 64

**Question:**
> Hi,
I have a question about implementing tax credits (as a policy intervention) to promote low-carbon technologies over the conventional emission-intensive technologies. Our case study includes ammonia production industry with the aim of achieving net-zero emission by 2050 through implementing several low-carbon technologies (steam reforming+CCUS, water electrolysis, ...).
As a relevant
policy int

**Answer** (by Antti-L):
> >
I think what you suggested for modifying FLO_EMIS (to turn to 0 from 2035) in fact deactivates the tax credit implementation (which we defined already by the SHAPE attribute) in year 2035 while the example plant is eligible to receive it until 2040, right? Or am I missing something?
No, it does not deactivate the tax credit implementation.  It does what you wanted:
It specifies the
tax credit to be applied only to technologies which are being built before 2035
(or a bit more accurately, those of having
vintage
of earlier than 2035). So, the last plant
vintage
eligible would be 2030, and beca

### 20. ACT_EFF and CHP configuration

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
