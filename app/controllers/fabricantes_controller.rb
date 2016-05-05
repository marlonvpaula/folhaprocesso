class FabricantesController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Fabricante.all
  end

  def create
    respond_with Fabricante.create(fabricante_params)
  end

  def update
    @fabricante = Fabricante.find(params[:id])
    
    respond_with @fabricante.update(fabricante_params)
  end

  def show
    respond_with Fabricante.find(params[:id])
  end

  def destroy
    @fabricante = Fabricante.find(params[:id])
    respond_with @fabricante.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def fabricante_params
    params.require(:fabricante).permit(:descricao)
  end

end
