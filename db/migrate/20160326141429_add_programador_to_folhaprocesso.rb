class AddProgramadorToFolhaprocesso < ActiveRecord::Migration
  def change
  	add_reference :folhaprocessos, :programador, index: true
  end
end
