class ComandosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Comando.all
  end

  def create
    respond_with Comando.create(comando_params)
  end

  def update
    @comando = Comando.find(params[:id])
    
    respond_with @comando.update(comando_params)
  end

  def show
    respond_with Comando.find(params[:id])
  end

  def destroy
    @comando = Comando.find(params[:id])
    respond_with @comando.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def comando_params
    params.require(:comando).permit(:descricao)
  end

end
