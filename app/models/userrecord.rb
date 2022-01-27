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
      if self.public_transport.zero?
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
    if self.food_habit.zero?
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
    # food_score = 100 - ((self.food_habit) / (4) * 100)
    self.food_score = food_score.clamp(0, 100)
    self.save
  end

  def calc_range(avg)
    avg * 1.5 - avg * 0.5
  end

  def calc_elec_score(elec_cost_input, household_size)
    # Annual US average electric emissions factor CO2 output rate in (lb/MWh) / 1000 - EGrid see source below
    elec_em_f = 0.88921
    # Annual US average electric cost per kwh in cents
    elec_cost = 0.1359
    # Average annual elec comsumption for a family
    avg_m_kwh = 7340 / 12
    # average multiple for different sized households
    multiple_house_size_2 = 1.45
    multiple_house_size_3 = 1.55
    multiple_house_size_4 = 1.82
    multiple_house_size_5 = 1.98
    if household_size == 1
      avg_m_kwh *= multiple_house_size_2
    elsif household_size == 2
      avg_m_kwh *= multiple_house_size_3
    elsif household_size == 3
      avg_m_kwh *= multiple_house_size_4
    elsif household_size == 4
      avg_m_kwh *= multiple_house_size_5
    else
      avg_m_kwh
    end
    # Elec average per person based on household size
    elec_avg_pp = avg_m_kwh * elec_em_f
    lbs_co2 = (elec_cost_input / elec_cost) * elec_em_f
    100 - ((lbs_co2 - (elec_avg_pp * 0.5)) / calc_range(elec_avg_pp) * 100)
  end

  def calc_living_score
    if self.primary_heating == 'oil'
      living_score = calc_oil_score(self.monthly_bill, self.household_size)
    elsif self.primary_heating == 'gas'
      living_score = calc_gas_score(self.monthly_bill, self.household_size)
    elsif self.primary_heating == 'unknown'
      living_score = calc_unknown_bill(self.monthly_bill)
    else
      living_score = calc_elec_score(self.monthly_bill, self.household_size)
    end
    self.living_score = living_score.clamp(0, 100)
    self.save
  end

  def calc_unknown_bill(bill)
    if bill.zero?
      70
    elsif bill == 1
      40
    else
      10
    end
  end

  def calc_oil_score(self_oil_cost, hhs)
    oil_em_f = 22.61
    oil_cost = 4.02
    oil_avg = 404
    lbs_co2 = (self_oil_cost / oil_cost) * oil_em_f
    lbs_co2 /= (hhs + 1)
    100 - ((lbs_co2 - (oil_avg * 0.5)) / calc_range(oil_avg) * 100)
  end

  def calc_gas_score(self_gas_cost, hhs)
    gas_cost = 10.68
    gas_avg = 255
    gas_em_f = 119.58
    lbs_co2 = (self_gas_cost / gas_cost) * gas_em_f
    lbs_co2 /= (hhs + 1)
    100 - ((lbs_co2 - (gas_avg * 0.5)) / calc_range(gas_avg) * 100)
  end

  def calc_shopping_score
    calc_shopping_freq = self.shop_time_freq * (self.total_shop_freq + 1)
    amount_shop_score = (100 - ((calc_shopping_freq - 12) / (52 - 12) * 100)).clamp(0, 100)
    # normalize the 0-4 range to a score out of 100
    new_shop_score = 100 - (self.new_shop_freq / 4 * 100)
    online_shop_score = 100 - (self.return_shop_freq / 4 * 100)
    return_shop_score = 100 - (self.online_shop_freq / 4 * 100)
    # weighted average of each activity
    self.shopping_score = (amount_shop_score * 0.2 + new_shop_score * 0.4 + online_shop_score * 0.3 + return_shop_score * 0.1)
    self.save
  end

  def calc_total_score
    # assumptions
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
    difference >= 168
  end

  def self.get_average_score
    without_zero = self.all.pluck(:score)
    without_zero.filter! {|u| u.positive?}
    without_zero.sum / without_zero.count
  end
end

# http://shrinkthatfootprint.com/food-carbon-footprint-diet --- eating breakdown
# https://www.sciencedirect.com/science/article/pii/S0160412019315752?via%3Dihub -- total breakdown.
# I took the weighted average fo each category domestic and overseas.
# Then I removed the 'services category and replaced distributed it out the the 4 other categories unevently. 
# I gave food a higher representation since it was seemingly underrepresented then I added 1 percent to each as I was off by 5%.
# https://www.biofuelsdigest.com/bdigest/2020/04/21/4-ways-to-address-your-homes-carbon-footprint/ --alternative
# https://www.bls.gov/regions/midwest/data/averageenergyprices_selectedareas_table.htm -- cost of elec per kw/h and cost of piped gas per therm
# https://greenzerocarbonhome.com/2018/07/what-is-the-carbon-footprint-of-natural-gas-heating-oil-propane-and-coal/ -- conversion of kwh and therm to pounds co2.

#  Natural Gas

# (average monthly gas bill per month / price per thousand cubic feet) pounds of CO2 per thousand cubic feet of natural gas.
# ($$per month /Natural_gas_cost_1000CF)*EF_natural_gas == pounds of co2 per month
# ($$per month /$10.68 )*119.58
# Price per thousand cubic feet of natural gas	$10.68 -- source: Energy Information Administration: US Residential Natural Gas Prices.  2013. 2012 annual average. http://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_a.htm 
# Emission factor (natural gas/thousand cubic feet)	119.58 -- source: Calculation - EPA, Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2011, Annex 2,Table A-38. http://www.epa.gov/climatechange/ghgemissions/usinventoryreport.html
# Average annual CO2 emissions from natural gas per household	7,892
# Average household size 2.53 -- https://www.statista.com/statistics/183648/average-size-of-households-in-the-us/#:~:text=The%20average%20American%20household%20consisted%20of%202.53%20people%20in%202020.&text=As%20shown%20in%20the%20statistic,their%20usual%20place%20of%20residence.
# 255 pounds is about average for a household of one person per month.
# Range - 382.5 - 127.5

#  Electricity

# ($$ price per month /cost_per_kWh)* e_factor_value
# ($$ price per month /$0.1359)* 1.238516 == pounds of co2 per month
#  e-factor -- source EPA. eGRID 9th edition Version 1.0 Subregion File (Year 2010 Data), 2014. http://www.epa.gov/cleanenergy/energy-resources/egrid/index.html
# cost per kwh -- source U.S. Energy Information Administration, Electric Power Monthly-September 2013, Table 5.3 (Average Retail Price of Electricity to Ultimate Customers, Residential Sector). http://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_5_3
# U.S. Energy Information Administration 2012. A Look at Residential Energy Consumption in 2009-Table CE2.1. http://www.eia.gov/consumption/residential/data/2009/indecfm?view=consumption
#  UPDATED --- https://www.eia.gov/consumption/residential/data/2015/c&e/pdf/ce2.1.pdf

# Average annual CO2e emissions from electricity per household 13284
# 454 pounds is about average for a household of one person per month.
# Range - 682 - 227

# Fuel Oil

# ($$ price per month/fuel_oil_cost)*EF_fuel_oil_gallon == pounds of co2 per month
# ($$ price per month/$4.02)*22.61
#  ef_fuel_oil_gallon --source Calculation - EPA, Inventory of U.S. Greenhouse Gas Emissions and Sinks: 1990-2011, Annex 2,Table A-38. 
# http://www.epa.gov/climatechange/ghgemissions/usinventoryreport.html.
# fuel oil cost --source Energy Information Administration, 2013. US No. 2 Heating Oil Residential Prices - 2012 annual average. 
# http://www.eia.gov/petroleum/heatingoilpropane/, http://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=M_EPD2F_PRS_NUS_DPG&f=M
# e-grid https://www.epa.gov/egrid/data-explorer

# Average annual CO2 emissions from fuel oil per household	12,460
# 404 pounds is about average for a household of one person per month.
#  606 - 202

# Transportation

#  miles driven per year -- https://www.fhwa.dot.gov/ohim/onh00/bar8.htm
# 13476 / 52 = 260m/week
#  range = 20%/average - 1.5x/average (52-390)
# if ev assume 100mpg
# mpg average = 25.4 for new cars -- https://nepis.epa.gov/Exe/ZyPDF.cgi?Dockey=P1013L5Z.pdf
# mpg range - 19.05 (.75%) - 45 (~1.75)
# weekly range low 20.47 - 1.15
# using public transport also + 1 or 2 or - 1 or 2 ????
# no car max 20% - 0%

# https://api.eia.gov/series/?api_key=8To42WkSnf9HLZxGPuUPGNyH0sJYZZxbCDeJgPP8&series_id=ELEC.PRICE.NY-RES.A

# 8To42WkSnf9HLZxGPuUPGNyH0sJYZZxbCDeJgPP8

#  Pounds of CO2 emitted per gallon 	18.74/gallon	lbs CO2/gallon -- https:www.eia.gov/environment/emissions/co2_vol_mass.php
#  Ratio of emissions of greenhouse gases other than CO2 	1.01	lbCO2e/lbCO2
#  Passenger Vehicle Fuel Economy	21.6	miles per gallon (mpg)
#  Average miles traveled per year per vehicle	https:www.fhwa.dot.gov/ohim/onh00/bar8.htm	miles per year 13,476
#  Average emissions for a typical vehicle	 10,484 	lbs CO2e/vehicle
#  (1/21.6 mpg)*11,398 miles/year*19.6 lbs CO2/gallon*CO2e / CO2

# shopping data
# https://quantis-intl.com/wp-content/uploads/2018/03/measuringfashion_globalimpactstudy_full-report_quantis_cwf_2018a.pdf

# https://www.thezebra.com/resources/driving/average-miles-driven-per-year/#infographic
# average miles per year
