class RemoveRaioFromFerramentafolha < ActiveRecord::Migration
  def change
    remove_reference :ferramentafolhas, :raio, index: true
  end
end
