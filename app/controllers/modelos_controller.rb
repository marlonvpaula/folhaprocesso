class ModelosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Modelo.where(empresa_id: current_user.empresa_id)
  end

  def create
    @modelo = Modelo.create(modelo_params)
    @modelo.empresa_id = current_user.empresa_id
    @modelo.user_id = current_user.id
    @modelo.save
    respond_with @modelo
  end

  def show
    respond_with Modelo.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def update
    @modelo = Modelo.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @modelo.update(modelo_params)
  end

  def destroy
    @modelo = Modelo.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @modelo.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def modelo_params
    params.require(:modelo).permit(:descricao)
  end
end
