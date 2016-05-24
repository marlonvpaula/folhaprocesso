class RemoveIndexDesenho < ActiveRecord::Migration
  def change
  	remove_index :desenhos, column: :codigo
  end
end
