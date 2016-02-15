class CreateOperacaos < ActiveRecord::Migration
  def change
    create_table :operacaos do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
