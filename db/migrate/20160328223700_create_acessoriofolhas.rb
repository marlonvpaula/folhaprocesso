class CreateAcessoriofolhas < ActiveRecord::Migration
  def change
    create_table :acessoriofolhas do |t|
      t.references :folhaprocesso, index: true
      t.references :acessorio, index: true

      t.timestamps
    end
  end
end
