class AcessoriosController < ApplicationController
  before_filter :authenticate_user!

	def index
    respond_with Acessorio.all
  end

  def create
    respond_with Acessorio.create(acessorio_params)
  end

  def update
    @acessorio = Acessorio.find(params[:id])
    
    respond_with @acessorio.update(acessorio_params)
  end

  def show
    respond_with Acessorio.find(params[:id])
  end

  def destroy
    @acessorio = Acessorio.find(params[:id])
    respond_with @acessorio.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def acessorio_params
    params.require(:acessorio).permit(:descricao)
  end

end
