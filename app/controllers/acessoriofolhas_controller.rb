class AcessoriofolhasController < ApplicationController
  before_filter :authenticate_user!

	def index
    respond_with Acessoriofolha.where(empresa_id: current_user.empresa_id)
  end

  def create
    @acessorio = Acessoriofolha.new(acessoriofolha_params)
    @acessorio.empresa_id = current_user.empresa_id
    @acessorio.user_id = current_user.id
    @acessorio.save
    respond_with @acessorio
  end

  def show
    respond_with Acessoriofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def update
    @acessoriofolha = Acessoriofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @acessoriofolha.update(acessoriofolha_params)
  end

  def destroy
    @acessoriofolha = Acessoriofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @acessoriofolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def acessoriofolha_params
    params.require(:acessoriofolha).permit(:folhaprocesso_id, :acessorio_id)
  end

end
