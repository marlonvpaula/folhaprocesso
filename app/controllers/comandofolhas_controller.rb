class ComandofolhasController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Comandofolha.where(empresa_id: current_user.empresa_id)
  end

  def create
    @comando = Comandofolha.new(comandofolha_params)
    @comando.empresa_id = current_user.empresa_id
    @comando.user_id = current_user.id
    @comando.save
    respond_with @comando
  end

  def show
    respond_with Comandofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def update
    @comandofolha = Comandofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @comandofolha.update(ferramentafolha_params)
  end

  def destroy
    @comandofolha = Comandofolha.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @comandofolha.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def comandofolha_params
    params.require(:comandofolha).permit(:folhaprocesso_id, :comando_id)
  end

end
