class AddTransportationhabitToUserrecords < ActiveRecord::Migration[7.0]
  def change
    add_column :userrecords, :own_ev, :boolean
    add_column :userrecords, :own_car, :boolean
    add_column :userrecords, :public_transport, :integer
  end
end
