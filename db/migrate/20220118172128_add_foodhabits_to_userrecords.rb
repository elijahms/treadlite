class AddFoodhabitsToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :food_habit, :integer
    add_column :userrecords, :household_size, :integer
    add_column :userrecords, :zip_code, :string
    add_column :userrecords, :elec_cost, :float
    add_column :userrecords, :water_cost, :float
    add_column :userrecords, :gas_cost, :float
    add_column :userrecords, :oil_cost, :float
    add_column :userrecords, :total_shop_freq, :integer
    add_column :userrecords, :shop_time_freq, :integer
    add_column :userrecords, :online_shop_freq, :integer
    add_column :userrecords, :return_shop_freq, :integer
    add_column :userrecords, :new_shop_freq, :integer
  end
end
