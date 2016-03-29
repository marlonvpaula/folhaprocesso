class CreateComandofolhas < ActiveRecord::Migration
  def change
    create_table :comandofolhas do |t|
      t.references :folhaprocesso, index: true
      t.references :comando, index: true

      t.timestamps
    end
  end
end
