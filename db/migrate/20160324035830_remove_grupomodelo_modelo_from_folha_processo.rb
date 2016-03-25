class RemoveGrupomodeloModeloFromFolhaProcesso < ActiveRecord::Migration
  def change
  	remove_reference :folhaprocessos, :grupomodelo, index: true
  	remove_reference :folhaprocessos, :modelo, index: true
  	remove_column :folhaprocessos, :nrDesenho
  end
end
