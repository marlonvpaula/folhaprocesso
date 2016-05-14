class AddTimestampToEmpresa < ActiveRecord::Migration
  def change
  	add_timestamps(:empresas)
  end
end
