class CreateInsertoFabricantes < ActiveRecord::Migration
  def change
    create_table :inserto_fabricantes do |t|
      t.references :fabricante, index: true
      t.references :inserto, index: true

      t.timestamps
    end
  end
end
