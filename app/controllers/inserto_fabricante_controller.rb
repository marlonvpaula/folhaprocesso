class InsertoFabricanteController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with InsertoFabricante.where(empresa_id: current_user.empresa_id)
  end

  def create
    @insertoFabricante = InsertoFabricante.create(inserto_fabricante_params)
    @insertoFabricante.empresa_id = current_user.empresa_id
    @insertoFabricante.user_id = current_user.id
    @insertoFabricante.save
    respond_with @insertoFabricante
  end

  def show
    respond_with InsertoFabricante.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @insertoFabricante = InsertoFabricante.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @insertoFabricante.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def inserto_fabricante_params
    params.require(:inserto_fabricante).permit(:fabricante_id, :inserto_id)
  end

end
