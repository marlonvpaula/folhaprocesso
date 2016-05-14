class AcessoriosController < ApplicationController
  before_filter :authenticate_user!

	def index
    respond_with Acessorio.where(empresa_id: current_user.empresa_id)
  end

  def create
    @acessorio = Acessorio.new(acessorio_params)
    @acessorio.empresa_id = current_user.empresa_id
    @acessorio.user_id = current_user.id
    @acessorio.save
    respond_with @acessorio
  end

  def update
    @acessorio = Acessorio.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @acessorio.update(acessorio_params)
  end

  def show
    respond_with Acessorio.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @acessorio = Acessorio.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @acessorio.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def acessorio_params
    params.require(:acessorio).permit(:descricao)
  end

end
