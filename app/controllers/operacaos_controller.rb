class OperacaosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Operacao.all
  end

  def create
    respond_with Operacao.create(operacao_params)
  end

  def update
    @operacao = Operacao.find(params[:id])
    
    respond_with @operacao.update(operacao_params)
  end

  def show
    respond_with Operacao.find(params[:id])
  end

  def destroy
    @operacao = Operacao.find(params[:id])
    respond_with @operacao.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def operacao_params
    params.require(:operacao).permit(:descricao)
  end
end
