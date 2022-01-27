class AddMonthlyBillToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :monthly_bill, :float
  end
end
