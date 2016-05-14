class ProgramadorsController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Programador.where(empresa_id: current_user.empresa_id)
  end

  def create
    @programador = Programador.create(programador_params)
    @programador.empresa_id = current_user.empresa_id
    @programador.user_id = current_user.id
    @programador.save
    respond_with @programador
  end

  def update
    @programador = Programador.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @programador.update(programador_params)
  end

  def show
    respond_with Programador.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @programador = Programador.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @programador.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def programador_params
    params.require(:programador).permit(:nome)
  end

end
