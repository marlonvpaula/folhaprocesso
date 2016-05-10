class AddEmpresaRef < ActiveRecord::Migration
  def change
  	add_reference :acessoriofolhas, :empresa, index: true
  	add_reference :comandofolhas, :empresa, index: true
  	add_reference :programadors, :empresa, index: true
  	add_reference :desenhos, :empresa, index: true
  	add_reference :comandos, :empresa, index: true
  	add_reference :acessorios, :empresa, index: true
  	add_reference :ferramentafolhas, :empresa, index: true
  	add_reference :folhaprocessos, :empresa, index: true
  	add_reference :modelos, :empresa, index: true
  	add_reference :grupomodelos, :empresa, index: true
  	add_reference :suporte_insertos, :empresa, index: true
  	add_reference :suportes, :empresa, index: true
  	add_reference :inserto_fabricantes, :empresa, index: true
  	add_reference :insertos, :empresa, index: true
  	add_reference :fabricantes, :empresa, index: true
  	add_reference :operacaos, :empresa, index: true
  	add_reference :users, :empresa, index: true
  end
end
