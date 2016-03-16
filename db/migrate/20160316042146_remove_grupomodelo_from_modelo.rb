class RemoveGrupomodeloFromModelo < ActiveRecord::Migration
  def change
    remove_reference :modelos, :grupomodelo, index: true
  end
end
