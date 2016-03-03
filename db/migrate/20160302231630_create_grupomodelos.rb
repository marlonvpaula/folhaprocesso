class CreateGrupomodelos < ActiveRecord::Migration
  def change
    create_table :grupomodelos do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
