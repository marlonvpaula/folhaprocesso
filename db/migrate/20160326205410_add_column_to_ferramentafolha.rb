class AddColumnToFerramentafolha < ActiveRecord::Migration
  def change
  	add_column :ferramentafolhas, :posicao, :string
  	add_column :ferramentafolhas, :altura, :string
  end
end
