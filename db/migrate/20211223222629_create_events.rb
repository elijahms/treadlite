class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
      t.string :weekday
      t.datetime :start_hour
      t.datetime :end_hour
      t.integer :user_id

      t.timestamps
    end
  end
end
