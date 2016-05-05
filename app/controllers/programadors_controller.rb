class ProgramadorsController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Programador.all
  end

  def create
    respond_with Programador.create(programador_params)
  end

  def update
    @programador = Programador.find(params[:id])
    
    respond_with @programador.update(programador_params)
  end

  def show
    respond_with Programador.find(params[:id])
  end

  def destroy
    @programador = Programador.find(params[:id])
    respond_with @programador.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def programador_params
    params.require(:programador).permit(:nome)
  end

end
