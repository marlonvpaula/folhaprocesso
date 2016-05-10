class AddUserRef < ActiveRecord::Migration
  def change
  	add_reference :acessoriofolhas, :user, index: true
  	add_reference :comandofolhas, :user, index: true
  	add_reference :programadors, :user, index: true
  	add_reference :desenhos, :user, index: true
  	add_reference :comandos, :user, index: true
  	add_reference :acessorios, :user, index: true
  	add_reference :ferramentafolhas, :user, index: true
  	add_reference :folhaprocessos, :user, index: true
  	add_reference :modelos, :user, index: true
  	add_reference :grupomodelos, :user, index: true
  	add_reference :suporte_insertos, :user, index: true
  	add_reference :suportes, :user, index: true
  	add_reference :inserto_fabricantes, :user, index: true
  	add_reference :insertos, :user, index: true
  	add_reference :fabricantes, :user, index: true
  	add_reference :operacaos, :user, index: true
  end
end
