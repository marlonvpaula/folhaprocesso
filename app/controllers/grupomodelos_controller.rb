class GrupomodelosController < ApplicationController
	def index
    respond_with Grupomodelo.all
  end

  def create
    respond_with Grupomodelo.create(grupomodelo_params)
  end

  def show
    respond_with Grupomodelo.find(params[:id])
  end

  def destroy
    @grupomodelo = Grupomodelo.find(params[:id])
    respond_with @grupomodelo.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def grupomodelo_params
    params.require(:grupomodelo).permit(:descricao)
  end
end
