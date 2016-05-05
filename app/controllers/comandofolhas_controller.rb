class ComandofolhasController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Comandofolha.all
  end

  def create
    respond_with Comandofolha.create(comandofolha_params)
  end

  def show
    respond_with Comandofolha.find(params[:id])
  end

  def update
    @comandofolha = Comandofolha.find(params[:id])
    
    respond_with @comandofolha.update(ferramentafolha_params)
  end

  def destroy
    @comandofolha = Comandofolha.find(params[:id])
    respond_with @comandofolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def comandofolha_params
    params.require(:comandofolha).permit(:folhaprocesso_id, :comando_id)
  end

end
