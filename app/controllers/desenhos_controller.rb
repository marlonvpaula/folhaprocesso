class DesenhosController < ApplicationController

	def index
    if params[:codigo].present?
      respond_with Desenho.where(codigo: params[:codigo])
    else
      respond_with Desenho.all
    end
  end

  def create
    respond_with Desenho.create(desenho_params)
  end

  def update
    @desenho = Desenho.find(params[:id])
    #@desenho 
    #puts " Desenho: #{params.inspect}" 
    respond_with = @desenho.update(desenho_params)
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
    params.require(:desenho).permit(:codigo, :titulo, :grupomodelo_id, :modelo_id, :picture)
  end

end
