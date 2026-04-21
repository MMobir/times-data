---
type: faq
title: "FAQ: Emissions"
aliases: []
tags: [faq, emissions]
sources:
  - raw/forum/threads/
related: []
last_updated: 2026-04-11
---

# FAQ: Emissions

This page collects frequently asked questions and expert answers about **Emissions** from the [VEDA/TIMES Forum](https://forum.kanors-emr.org/).

**Threads in this category:** 194
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

### 2. Extremely high marginal costs on CO2 constraint

**Asked by:** dlmccollum | **Forum:** VEDA FE - Questions and Observations | **Thread:** [76](../../raw/forum/threads/76.json) | **Posts:** 290

**Question:**
> Dear Antti, Amit, et al.,
I've been struggling the past couple of days trying to understand why my CO2 prices are so high in the later model periods.  I'm reading off the "EQ_CombalM" values for CO2, for which I specify annual caps that decrease over time.  The caps are formulated using the "COM_BNDNET" attribute.  The CO2 prices gradually rise over time to $100-200/tonne, depending on the scenari

**Answer** (by Antti-L):
> David:
I would have to be given the exact definitions of "organic" and "mechanic" problems to comment on that particular qualification by Amit.
However, I think that the marginal cost of 10,000 USD/tonne is very high indeed, and I would not expect to get such high costs in my models.  The symptoms you have described lead me to suspect that you may have modeled some constraint(s) (e.g. user constraints or market-share constraints) that don't work well anymore in the context where the emissions should be very tightly constrained.  In other words, I suspect that some of the constraint(s) you have

### 3. Setting lower bound on sectoral emissions

**Asked by:** UKTM User | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1304](../../raw/forum/threads/1304.json) | **Posts:** 75

**Question:**
> Hi,
I'm trying to set minimum emissions on process sector to be 9MtCO2e, please see my constraint in the attached picture.
The model just ignored it, so I'm wondering if it's the right way to do this.
Thank you so much in advance.

**Answer** (by Antti-L):
> I am sorry but I still don't understand what this "EMIS GHG PRC" actually is.  Is it the name of a VEDA-specific
commodity set
, and does it have several members?  I doubt that names containing blanks (spaces) can be used as names of commodity sets (or commodities), but the VEDA developers may confirm.
Anyway, you are requiring that
both
CSet_CN
and
CSet_Set
should be "EMIS GHG PRC".  That does not make sense to me.  And even if "EMIS GHG PRC" might work as a CSet_Set name, the specification would only make sense if it contains only a
single commodity
(representing those "total emissions in pr

### 4. process-based emission factor

**Asked by:** Samaneh | **Forum:** VEDA FE - Questions and Observations | **Thread:** [208](../../raw/forum/threads/208.json) | **Posts:** 75

**Question:**
> Hello,
I have a lot of emission factors based on both process and commodity in or out of the process. I defined them in ~PRCCOMEMI table in VEDA-FE. It seems that the model is not able to read them as the way i entered the data.
For example, I have a gasoline car which has 2 input fuel (gasoline and ethanol). So, i have 2 emission factors CO2 and NOX (kt/PJ of gasoline) and 2 other factors (kt/PJ 

**Answer** (by Antti-L):
> It seems you understood Amit's message wrong: ~PRCCOMEMI should be at the CommName column, because it is the "last column
with index information
".
But because you already had it there at the right position originally (although in the tables you posted that seemed not to be the case), the only remaining thing I can suggest to check is your commodity declarations. Are the emission commodities declared properly in the Subres, with the type ENV? And are the fuels also declared properly and included in the topology of the technologies?
If that does not help either, this looks like a mystery proble

### 5. How to set emission factor for each year of a specific process during its lifetime?

**Asked by:** Xin Wang | **Forum:** VEDA FE - Questions and Observations | **Thread:** [516](../../raw/forum/threads/516.json) | **Posts:** 75

**Question:**
> Hello, everyone!
In VEDA-FE, for example, a process with lifetime of 10 years starts to operate in 2010, and we can set the emission factor for 2011-2020. But when there is another process that can be used in any year during 2020-2050, how can we set the value of emission factor for each year during its lifetime, as we don't know the exact time that the model will choose to use this process? Thank

**Answer** (by Antti-L):
> Ok, because you still seem to have difficulties understanding how SHAPE works in this example, I tried to see if I can
A)
reproduce your results with the DEMO model, and
B)
see if your claims have any merit.
I was not fully able to reproduce your results, but my results were close enough to be consistent with the aggregate results you showed. However, I also noticed that my original wording in the above was a bit sloppy and thus inaccurate, and so I have corrected it now into my post above:
My original wording
: "When periods are longer than one year, the age is an average value over the perio

### 6. Tradeoff for user-defined objective function

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

### 7. UC_CO2 Trading

**Asked by:** JozefO | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1018](../../raw/forum/threads/1018.json) | **Posts:** 70

**Question:**
> Hello guys.
I m thinking about creating Emissions (CO2) trading system - ETS in TIMES. Here is an example.
Tech_18
produced (ENV) Commodity
CO2_18
in 2018, 8.5 kT CO2 per annum. Free emission allocation (FEA) for years 2018, 2020, 2025, 2030 ... are
2018 = 8.7 kT FEA
2020 = 8.2 kT FEA
2025 = 7.8 kT FEA
2030 = 7.4 kT FEA
Prices for kT/CO2 are:
2018 = 0.008 mEuro/kT
2020 = 0.013 mEuro/kT
2025 = 0.01

**Answer** (by Antti-L):
> But I already gave you a working example, didn't I?
An emissions trading system only sets a cap (bound) on the total amount of emissions that can be emitted by the installations covered by the system.  That cap corresponds to the
total amount of allowances
, whether they are auctioned off or allocated for free, and the allowances can subsequently be traded.
In your case, I have understood that your model does not include the whole ETS system, but only a single participating country exposed to exogenous prices of emission allowances, and therefore I suggested to use an exogenous trade process (

### 8. Need help with reviewing DAC technology specification

**Asked by:** smriti_ms | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1257](../../raw/forum/threads/1257.json) | **Posts:** 70

**Question:**
> Hello,
This is my first time introducing a technology to the TIMES model. We are building on EPA's 9 region TIMES Model for the United States - EPAUS9rT_v20.2.
Sets: PRE
TechName: DACCCS (direct air capture process)
Tact: kt (short ton)
Tcap: kt/year (short ton per year)
With the following characteristics:
TechName: DACCCS
Comm-IN: ELCCO2 (CO2 emissions from power generation), ELCNGCEA (natural ga

**Answer** (by Antti-L):
> Welcome to the Forum.
The TIMES modeling framework provides quite a lot of flexibility and freedom for the modeler to choose between
different modeling approaches
, which I think is a good thing, but may require some efforts on learning the various details of the TIMES functionality. Different approaches may also make it less easy to comment on an individual modeling approach without seeing the "full picture", like in your example case of DACCS.  Therefore, below I just try to give first some general thoughts, and then raise some questions.
First, you should keep in mind the formulation of com

### 9. Errors when attempting stochastic run

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

### 10. CCS retrofit transition

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

### 11. How to avoid winner-take-all

**Asked by:** guozhi1305 | **Forum:** VEDA FE - Questions and Observations | **Thread:** [1228](../../raw/forum/threads/1228.json) | **Posts:** 67

**Question:**
> Dear all,
I want to know how to avoid winner-take-all. The objective function of the TIMES model is cost optimization, which can impose market penetration or technology share constraints. However, for multiple technologies, if every process is set (such as the transportation sector), there may be some questions such as 1) Not every process can be constrained. And if we add too many constraints, it

**Answer** (by Antti-L):
> >
Whether the TIMES model can be linked with a discrete selection model similar to the GCAM model, and the market share can be calculated based on the cost.
Yes, sure it can.  Some TIMES models and the Markal SAGE algorithm implement market share algorithms comparable to the GCAM modified logit discrete choice model, see below:
As you can see, both the TIMES Ireland model and the Markal SAGE time-stepped algorithm implement market share algorithms that are resembling the GCAM Modified Logit formulation. The CIMS formulation adopted by TIMES Ireland differs from it by employing intangible costs

### 12. Preventing early retirements with RCAP_BND

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

### 13. TIAM - GHG constraint

**Asked by:** srchlela | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1177](../../raw/forum/threads/1177.json) | **Posts:** 65

**Question:**
> Dear all,
I have a UC_COMNET on the GHG commodity that sets it to zero in 2050 for the EEU+WEU (please see the attached).
In the results, the Var_Fout for GHG goes to zero, whereas all the emissions commodities (the CO2, CH4, and N2O) do not.
They are agreggated as in the attached photo.
Then I tried a UC_COMNET also for EU on the commodities. Some go to zero in the CO2 but non in CH4 or N2O.
What

**Answer** (by Antti-L):
> Recall once again the balances:
VAR_COMNET − Imports + Exports  =  Production − Consumption
Hence, if you make a constraint bounding  (VAR_COMNET − Imports + Exports) to zero, then (Production − Consumption) will also be bounded to zero, and that expression is the regional net emissions (unless you have dummy imports for the constraint).
>
In the results the COMNET for GHG for WEU remains positive (the sum EEU+WEU as well)
If you bound the net emissions of EEU+WEU to zero, then VAR_COMNET for (EEU+WEU) can be positive, if there are net imports of those emissions into EEU+WEU.  So, can you conf

### 14. Problems with FLO_EMIS

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

### 15. Tax credits implementation for low-carbon technologies

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

### 16. Levelised cost calculation

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

### 17. Forest sink and SHAPE curve

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

### 18. UC to Cumulativly Constrain TOTCO2e

**Asked by:** JGlynn | **Forum:** VEDA FE - Questions and Observations | **Thread:** [396](../../raw/forum/threads/396.json) | **Posts:** 63

**Question:**
> Hi All
I wonder can you help me figure out a user constraint for combining TOTN2O + TOTCH4 with TOTN2O in ETSAP-TIAM to give a CO2 equivalent commodity TOTCO2e of all three GHGs?
I have used scenarios with cumulative constraints of specified individually on CO2, N2O and CH4 (below).
However, I'd like the added flexibility of combining TOTCO2, TOTN2O, TOTCH4 using their warming potentials (1, 310, 

**Answer** (by Antti-L):
> James' example shows illegal use of a year range for UC_COMNET. UC_COMNET accepts only single years (and UC_RHS does not accept any year indexes). If you want to use the UC_COMNET approach, you need to define the Period range by UC_Sets: as shown earlier in the thread:
UC_Sets:T_S: 2020,2100,0
Here, the final ",0" is an "interpolation" option, such that all periods between 2020 and 2100 are included.
Alternatively, you could set UC_Sets:T_S: empty, which means that all periods are included.
Alternatively, you could set UC_Sets:T_S: empty, and use UC_CUMCOM with an exact year range.
Alternative

### 19. COM_EMI and FLO_EMIS

**Asked by:** LucasD | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [988](../../raw/forum/threads/988.json) | **Posts:** 63

**Question:**
> Dear forum,
I just have a doubt on the accounting of emissions in TIMES.
I have a COMEMI table that specifies for each fuel the quantity of CO2 emitted per PJ of fuel combusted. I have a coal plant that consumes 2.5 PJ of coal and 1PJ of coal emits 100 ktCO2 according my COMEMI table. Let's assume that a new coal plant captures 100% of the emitted CO2 so that the process does not emit CO2 anymore.

**Answer** (by Antti-L):
> No, TIMES should not be double-counting emissions, I think it is the modeller who may make such mistake.
There was no COM_EMI table attached.  But I assume you may be defining CO2 emissions for all processes consuming ELCCOA in such a table, is that correct?  If that is so, for a CCS technology you must then either define the captured amount as a negative emission somewhere, or replace the gross emission factor by an appropriate net factor. I guess the most robust place for a accounting the captured emission would be the CO2 storage technology, because one should not be credited for it unless 

### 20. User Constraint not Binding

**Asked by:** slevinson | **Forum:** VEDA 2.0 - Questions and Observations | **Thread:** [1213](../../raw/forum/threads/1213.json) | **Posts:** 62

**Question:**
> Hi,
I'm working on developing a  Regular Scenario with user constraints to limit CO2 emissions. This is modeled using the EPA US 9 Region TIMES model. I have attached a sheet that shows a sample of the constraints that I am trying to use. However when running the model, I get results that exceed the user constraints.
In 2050 the constraint limits the sum of ELCCO2, TRNCO2, and INDCO2 to 800, howev

**Answer** (by Antti-L):
> @Victor:
>
I would like to write a veda table to deactivate a list of user constraints defined in a different regular scenario.
>
I think turning lim_type from UP to N for the selected uc_n would work but I did not managed to find the proper declaration in veda.
>
I can see the potential for a user who wants to define in bulk constraints and then only activate subset of these constraints for example with the parametric scenarios feature in veda.
I tried to see if a simple mechanism could be added into TIMES for this purpose, and arrived at a tentative implementation, based on using an interpol
