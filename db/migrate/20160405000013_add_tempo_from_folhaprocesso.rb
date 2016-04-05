class AddTempoFromFolhaprocesso < ActiveRecord::Migration
  def change
  	add_column :folhaprocessos, :tempo, :string
  end
end
