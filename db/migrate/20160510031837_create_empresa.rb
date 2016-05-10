class CreateEmpresa < ActiveRecord::Migration
  def change
    create_table :empresas do |t|
      t.string :nome
      t.string :logo
    end
  end
end
