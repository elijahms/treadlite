class CreateUserrecords < ActiveRecord::Migration[7.0]
  def change
    create_table :userrecords do |t|
      t.integer :user_id
      t.integer :miles_per_gallon
      t.integer :miles_per_week
      t.integer :score
      t.timestamps
    end
  end
end
