class CreateAcessorios < ActiveRecord::Migration
  def change
    create_table :acessorios do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
