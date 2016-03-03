class CreateModelos < ActiveRecord::Migration
  def change
    create_table :modelos do |t|
      t.string :descricao
      t.references :grupomodelo, index: true

      t.timestamps
    end
  end
end
