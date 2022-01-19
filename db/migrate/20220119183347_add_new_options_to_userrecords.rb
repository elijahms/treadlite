class AddNewOptionsToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :primary_heating, :string
    add_column :userrecords, :living_score, :integer
    add_column :userrecords, :transportation_score, :integer
  end
end
