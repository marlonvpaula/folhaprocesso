class DesenhosController < ApplicationController

	def index
    respond_with Desenho.all
  end

  def create
    respond_with Desenho.create(desenho_params)
  end

  def update
    @desenho = Desenho.find(params[:id])
    
    respond_with @desenho.update(desenho_params)
  end

  def show
    respond_with Desenho.find(params[:id])
  end

  def destroy
    @desenho = Desenho.find(params[:id])
    respond_with @desenho.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def desenho_params
    params.require(:desenho).permit(:codigo, :titulo, :grupomodelo_id, :modelo_id)
  end

end
