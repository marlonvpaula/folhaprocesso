class AcessoriofolhasController < ApplicationController
  before_filter :authenticate_user!

	def index
    respond_with Acessoriofolha.all
  end

  def create
    respond_with Acessoriofolha.create(acessoriofolha_params)
  end

  def show
    respond_with Acessoriofolha.find(params[:id])
  end

  def update
    @acessoriofolha = Acessoriofolha.find(params[:id])
    
    respond_with @acessoriofolha.update(acessoriofolha_params)
  end

  def destroy
    @acessoriofolha = Acessoriofolha.find(params[:id])
    respond_with @acessoriofolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def acessoriofolha_params
    params.require(:acessoriofolha).permit(:folhaprocesso_id, :acessorio_id)
  end

end
