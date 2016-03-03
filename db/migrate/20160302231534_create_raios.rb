class CreateRaios < ActiveRecord::Migration
  def change
    create_table :raios do |t|
      t.decimal :valor

      t.timestamps
    end
  end
end
