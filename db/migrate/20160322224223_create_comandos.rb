class CreateComandos < ActiveRecord::Migration
  def change
    create_table :comandos do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
