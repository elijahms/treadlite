class Userrecord < ApplicationRecord

    def calc_transportation_score
        
        if self.own_car == true
            if self.own_ev == true
                self.miles_per_gallon = 100
                weekly_co_em = self.miles_per_week / self.miles_per_gallon
            else
                weekly_co_em = self.miles_per_week / self.miles_per_gallon
            end
            transportation_score = 100 - ((weekly_co_em - 1.15) / (20.47 - 1.15) * 100)
            transportation_score = transportation_score + self.public_transport * 2
        else
            if self.public_transport == 0
                transportation_score = 80
            elsif self.public_transport == 1
                transportation_score = 85
            elsif self.public_transport == 2
                transportation_score = 90
            elsif self.public_transport == 3
                transportation_score = 95
            elsif self.public_transport == 4
                transportation_score = 100
            end 
        end
        self.transportation_score = transportation_score.clamp(0, 100)
        self.save
    end

    def calc_food_score
        if self.food_habit == 0
            food_score = 100
        elsif self.food_habit == 1
            food_score = 50
        elsif self.food_habit == 2
            food_score = 20
        elsif self.food_habit == 3
            food_score = 10
        elsif self.food_habit == 4
            food_score = 0
        end 
        self.food_score = food_score.clamp(0, 100)
    end

    def calc_living_score
        if self.primary_heating == 'oil'
            lbs_co2 = (self.oil_cost / 4.02) * 22.61
            lbs_co2 = lbs_co2 / (self.household_size + 1)
            living_score = 100 - ((lbs_co2 - 2424) / (7272 - 2424) * 100)
        elsif self.primary_heating == 'gas'
            lbs_co2 = (self.gas_cost / 10.68 ) * 119.58
            lbs_co2 = lbs_co2 / (self.household_size + 1)
            living_score = 100 - ((lbs_co2 - 1535) / (4606 - 1535 ) * 100)
        else 
            lbs_co2 = (self.elec_cost / 0.1188 ) * 1.238516
            lbs_co2 = lbs_co2 / (self.household_size + 1)
            living_score = 100 - ((lbs_co2 - 2727) / (8182 - 2727) * 100)
        end
        self.living_score = living_score.clamp(0, 100)
        self.save
    end

    def calc_shopping_score
        calc_shopping_freq = self.shop_time_freq * self.total_shop_freq
        new_shop = self.new_shop_freq + 1
        return_shop = self.return_shop_freq + 1
        online_shop = self.online_shop_freq + 1
        amount_shop_score = 100 - ((calc_shopping_freq - 12) / (52 - 12) * 100)
        amount_shop_score = amount_shop_score.clamp(0, 100)
        new_shop_score = 100 - ((new_shop - 1) / (4) * 100)
        online_shop_score = 100 - ((return_shop - 1) / (4) * 100)
        return_shop_score = 100 - ((online_shop - 1) / (4) * 100)
        shopping_score = amount_shop_score * 0.2 + new_shop_score * 0.4 + online_shop_score * 0.3 + return_shop_score * 0.1
        self.shopping_score = shopping_score.clamp(0, 100)
        self.save
    end

    def calc_total_score
        ##assumptions
        living_p = 0.39
        transportation_p = 0.325
        food_p = 0.185
        shopping_p = 0.1
        score = self.living_score * living_p + self.transportation_score * transportation_p + self.food_score * food_p + self.shopping_score * shopping_p
        self.score = score.clamp(0, 100)
        self.save
    end

    def calc_update_permission
        today = Time.new
        last_update = self.trend_update
        difference = (today - last_update) / 3600
        if difference >= 168
            true
        else
            false
        end
    end
end

 ##http://shrinkthatfootprint.com/food-carbon-footprint-diet --- eating breakdown
 ##https://www.sciencedirect.com/science/article/pii/S0160412019315752?via%3Dihub -- total breakdown. I took the weighted average fo each category domestic and overseas then I removed the 'services category and replaced distributed it out the the 4 other categories unevently. I gave food a higher representation since it was seemingly underrepresented then I added 1 percent to each as I was off by 5%.
 ##https://www.biofuelsdigest.com/bdigest/2020/04/21/4-ways-to-address-your-homes-carbon-footprint/ --alternative
##https://www.bls.gov/regions/midwest/data/averageenergyprices_selectedareas_table.htm -- cost of elec per kw/h and cost of piped gas per therm
##https://greenzerocarbonhome.com/2018/07/what-is-the-carbon-footprint-of-natural-gas-heating-oil-propane-and-coal/ -- conversion of kwh and therm to pounds co2.


## Natural Gas

##(average monthly gas bill per month / price per thousand cubic feet) pounds of CO2 per thousand cubic feet of natural gas 

##($$per month /Natural_gas_cost_1000CF)*EF_natural_gas == pounds of co2 per month

##($$per month /$10.68 )*119.58

##Price per thousand cubic feet of natural gas	$10.68 -- source: Energy Information Administration: US Residential Natural Gas Prices.  2013. 2012 annual average. http://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_a.htm 

##Emission factor (natural gas/thousand cubic feet)	119.58 -- source: Calculation - EPA, Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2011, Annex 2,Table A-38. http://www.epa.gov/climatechange/ghgemissions/usinventoryreport.html

##3,071 pounds is about average for a household of one person over a year.
##Range - 1535 - 4606

## Electricity

##($$ price per month /cost_per_kWh)* e_factor_value
##($$ price per month /$0.1188)* 1.238516 == pounds of co2 per month
## e-factor -- source EPA. eGRID 9th edition Version 1.0 Subregion File (Year 2010 Data), 2014. http://www.epa.gov/cleanenergy/energy-resources/egrid/index.html
##cost per hwh -- source U.S. Energy Information Administration, Electric Power Monthly-September 2013, Table 5.3 (Average Retail Price of Electricity to Ultimate Customers, Residential Sector). http://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_5_3
## 5,455 pounds is about average in the U.S. for a household of one person over a year.
## range - 2727- 8182

##Fuel Oil

##($$ price per month/fuel_oil_cost)*EF_fuel_oil_gallon == pounds of co2 per month
##($$ price per month/$4.02)*22.61
## ef_fuel_oil_gallon --source Calculation - EPA, Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2011, Annex 2,Table A-38. http://www.epa.gov/climatechange/ghgemissions/usinventoryreport.html.
## fuel oil cost --source Energy Information Administration, 2013. US No. 2 Heating Oil Residential Prices - 2012 annual average. http://www.eia.gov/petroleum/heatingoilpropane/, http://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=M_EPD2F_PRS_NUS_DPG&f=M
## 4,848 pounds is about average for a household of one person over a year. 
## 2424 - 7272


## miles driven per year -- https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
##13476 / 52 = 260m/week 
## range = 20%/average - 1.5x/average (52-390)
## if ev assume 100mpg
##mpg average = 25.4 for new cars -- https://nepis.epa.gov/Exe/ZyPDF.cgi?Dockey=P1013L5Z.pdf
##mpg range - 19.05 (.75%) - 45 (~1.75)
##weekly range low 20.47 - 1.15
## using public transport also + 1 or 2 or - 1 or 2 ????
## no car max 20% - 0%
