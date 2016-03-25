class AddDesenhoToFolhaprocesso < ActiveRecord::Migration
  def change
  	add_reference :folhaprocessos, :desenho, index: true
  	add_reference :folhaprocessos, :operacao, index: true
  end
end
