class ComandosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Comando.where(empresa_id: current_user.empresa_id)
  end

  def create
    @comando = Comando.create(comando_params)
    @comando.empresa_id = current_user.empresa_id
    @comando.user_id = current_user.id
    @comando.save
    respond_with @comando
  end

  def update
    @comando = Comando.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @comando.update(comando_params)
  end

  def show
    respond_with Comando.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @comando = Comando.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @comando.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def comando_params
    params.require(:comando).permit(:descricao)
  end

end
