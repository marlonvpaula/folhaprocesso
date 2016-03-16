class AddRaioNumberToInsertos < ActiveRecord::Migration
  def change
  	add_column :insertos, :raio, :decimal
  end
end
