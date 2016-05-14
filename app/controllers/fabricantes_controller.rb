class FabricantesController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Fabricante.where(empresa_id: current_user.empresa_id)
  end

  def create
    @fabricante = Fabricante.new(fabricante_params)
    @fabricante.empresa_id = current_user.empresa_id
    @fabricante.user_id = current_user.id
    @fabricante.save
    respond_with @fabricante
  end

  def update
    @fabricante = Fabricante.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @fabricante.update(fabricante_params)
  end

  def show
    respond_with Fabricante.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @fabricante = Fabricante.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @fabricante.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def fabricante_params
    params.require(:fabricante).permit(:descricao)
  end

end
