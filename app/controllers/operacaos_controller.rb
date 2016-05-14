class OperacaosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Operacao.where(empresa_id: current_user.empresa_id)
  end

  def create
    @operacao = Operacao.create(operacao_params)
    @operacao.empresa_id = current_user.empresa_id
    @operacao.user_id = current_user.id
    @operacao.save
    respond_with @operacao
  end

  def update
    @operacao = Operacao.where(empresa_id: current_user.empresa_id).find(params[:id])
    
    respond_with @operacao.update(operacao_params)
  end

  def show
    respond_with Operacao.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @operacao = Operacao.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @operacao.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def operacao_params
    params.require(:operacao).permit(:descricao)
  end
end
