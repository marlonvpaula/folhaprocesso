class CreateFerramentafolhas < ActiveRecord::Migration
  def change
    create_table :ferramentafolhas do |t|
      t.references :folhaprocesso, index: true
      t.references :suporte, index: true
      t.references :inserto, index: true
      t.references :fabricante, index: true
      t.references :raio, index: true

      t.timestamps
    end
  end
end
