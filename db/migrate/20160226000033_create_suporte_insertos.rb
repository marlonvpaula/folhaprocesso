class CreateSuporteInsertos < ActiveRecord::Migration
  def change
    create_table :suporte_insertos do |t|
      t.references :suporte, index: true
      t.references :inserto, index: true

      t.timestamps
    end
  end
end
