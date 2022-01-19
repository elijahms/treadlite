class AddNewFoodScoreToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :food_score, :integer
  end
end
