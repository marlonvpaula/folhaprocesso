class CreateSuportes < ActiveRecord::Migration
  def change
    create_table :suportes do |t|
      t.string :descricao
      t.references :operacao

      t.timestamps
    end
  end
end
