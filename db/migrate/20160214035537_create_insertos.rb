class CreateInsertos < ActiveRecord::Migration
  def change
    create_table :insertos do |t|
      t.string :descricao

      t.timestamps
    end
  end
end
