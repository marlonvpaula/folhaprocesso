class FerramentafolhasController < ApplicationController
	def index
    respond_with Ferramentafolha.all
  end

  def create
    respond_with Ferramentafolha.create(ferramentafolha_params)
  end

  def show
    respond_with Ferramentafolha.find(params[:id])
  end

  def update
    @ferramentafolha = Ferramentafolha.find(params[:id])
    
    respond_with @ferramentafolha.update(ferramentafolha_params)
  end

  def destroy
    @ferramentafolha = Ferramentafolha.find(params[:id])
    respond_with @ferramentafolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def ferramentafolha_params
    params.require(:ferramentafolha).permit(:folhaprocesso_id, :suporte_id, :inserto_id, 
    	                                      :fabricante_id, :raio_id)
  end
end
