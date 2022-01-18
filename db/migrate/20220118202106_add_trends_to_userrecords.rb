class AddTrendsToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :trend_num, :integer
    add_column :userrecords, :trend_update, :datetime
  end
end
