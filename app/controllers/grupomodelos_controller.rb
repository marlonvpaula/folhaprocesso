class GrupomodelosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Grupomodelo.where(empresa_id: current_user.empresa_id)
  end

  def create
    @grupomodelo = Grupomodelo.new(grupomodelo_params)
    @grupomodelo.empresa_id = current_user.empresa_id
    @grupomodelo.user_id = current_user.id
    @grupomodelo.save
    respond_with @grupomodelo
  end

  def show
    respond_with Grupomodelo.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def update
    @grupomodelo = Grupomodelo.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @grupomodelo.update(grupomodelo_params)
  end

  def destroy
    @grupomodelo = Grupomodelo.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @grupomodelo.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def grupomodelo_params
    params.require(:grupomodelo).permit(:descricao)
  end
end
