class AddUniqueCodigoDesenho < ActiveRecord::Migration
  def change
  	add_index :desenhos, :codigo, :unique => true
  end
end
