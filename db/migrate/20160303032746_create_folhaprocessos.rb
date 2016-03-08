class CreateFolhaprocessos < ActiveRecord::Migration
  def change
    create_table :folhaprocessos do |t|
      t.integer :nrDesenho
      t.string :nomepeca
      t.date :dtProjeto
      t.date :dtVerificacao
      t.references :grupomodelo, index: true
      t.references :modelo, index: true

      t.timestamps
    end
  end
end
