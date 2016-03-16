class ModelosController < ApplicationController
	def index
    respond_with Modelo.all
  end

  def create
    respond_with Modelo.create(modelo_params)
  end

  def show
    respond_with Modelo.find(params[:id])
  end

  def update
    @modelo = Modelo.find(params[:id])
    
    respond_with @modelo.update(modelo_params)
  end

  def destroy
    @modelo = Modelo.find(params[:id])
    respond_with @modelo.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def modelo_params
    params.require(:modelo).permit(:descricao)
  end
end
