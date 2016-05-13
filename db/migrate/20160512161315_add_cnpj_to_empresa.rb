class AddCnpjToEmpresa < ActiveRecord::Migration
  def change
  	add_column :empresas, :cnpj, :string
  	add_column :empresas, :endereco, :string
  	add_column :empresas, :numero, :integer
  	add_column :empresas, :bairro, :string
  	add_column :empresas, :telefone, :string
  	add_column :empresas, :cep, :string
  	add_column :empresas, :dtVencimento, :date
  end
end
