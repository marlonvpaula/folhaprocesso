class FerramentafolhasController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Ferramentafolha.where(empresa_id: current_user.empresa_id)
  end

  def create
    @ferramentafolha = Ferramentafolha.new(ferramentafolha_params)
    @ferramentafolha.empresa_id = current_user.empresa_id
    @ferramentafolha.user_id = current_user.id
    @ferramentafolha.save
    respond_with @ferramentafolha
  end

  def show
    respond_with Ferramentafolha.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def update
    @ferramentafolha = Ferramentafolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @ferramentafolha.update(ferramentafolha_params)
  end

  def destroy
    @ferramentafolha = Ferramentafolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @ferramentafolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def ferramentafolha_params
    params.require(:ferramentafolha).permit(:folhaprocesso_id, :posicao, :suporte_id, :inserto_id, 
    	                                      :fabricante_id, :altura)
  end
end
