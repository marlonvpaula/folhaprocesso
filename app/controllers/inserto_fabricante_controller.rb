class InsertoFabricanteController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with InsertoFabricante.all
  end

  def create
    respond_with InsertoFabricante.create(inserto_fabricante_params)
  end

  def show
    respond_with InsertoFabricante.find(params[:id])
  end

  def destroy
    @insertoFabricante = InsertoFabricante.find(params[:id])
    respond_with @insertoFabricante.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def inserto_fabricante_params
    params.require(:inserto_fabricante).permit(:fabricante_id, :inserto_id)
  end

end
