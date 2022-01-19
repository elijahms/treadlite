class AddNewShoppingScoreToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :shopping_score, :integer
  end
end
