class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.text :content
      t.integer :event_id

      t.timestamps
    end
  end
end
