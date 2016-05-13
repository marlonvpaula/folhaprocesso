class EmpresasController < ApplicationController
  before_filter :authenticate_user!, only: [:index, :show, :update, :destroy]

	def index
    respond_with Empresa.all
  end

  def create
    respond_with Empresa.create(empresa_params)
  end

  def show
    respond_with Empresa.find(params[:id])
  end

  def update
    @empresa = Empresa.find(params[:id])
    
    respond_with @empresa.update(empresa_params)
  end

  def destroy
    @empresa = Empresa.find(params[:id])
    respond_with @empresa.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def empresa_params
    params.require(:empresa).permit(:nome, :logo, :cnpj, :endereco, :numero, 
    	                              :bairro, :telefone, :cep, :dtVencimento)
  end

end
