class CreateDesenhos < ActiveRecord::Migration
  def change
    create_table :desenhos do |t|
      t.string :codigo
      t.string :titulo
      t.references :modelo, index: true
      t.references :grupomodelo, index: true

      t.timestamps
    end
  end
end
