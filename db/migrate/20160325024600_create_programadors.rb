class CreateProgramadors < ActiveRecord::Migration
  def change
    create_table :programadors do |t|
      t.string :nome

      t.timestamps
    end
  end
end
