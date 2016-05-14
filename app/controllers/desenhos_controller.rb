class DesenhosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    if params[:codigo].present?
      respond_with Desenho.where(codigo: params[:codigo], empresa_id: current_user.empresa_id)
    else
      respond_with Desenho.where(empresa_id: current_user.empresa_id)
    end
  end

  def create
    @desenho = Desenho.new(desenho_params)
    @desenho.empresa_id = current_user.empresa_id
    @desenho.user_id = current_user.id
    @desenho.save
    respond_with @desenho
  end

  def update
    @desenho = Desenho.where(empresa_id: current_user.empresa_id).find(params[:id])
    #@desenho 
    #puts " Desenho: #{params.inspect}" 
    respond_with = @desenho.update(desenho_params)
  end

  def show
    respond_with Desenho.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @desenho = Desenho.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @desenho.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def desenho_params
    params.require(:desenho).permit(:codigo, :titulo, :grupomodelo_id, :modelo_id, :picture)
  end

end
