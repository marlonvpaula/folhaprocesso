class RaiosController < ApplicationController
	def index
    respond_with Raio.all
  end

  def create
    respond_with Raio.create(raio_params)
  end

  def show
    respond_with Raio.find(params[:id])
  end

  def destroy
    @raio = Raio.find(params[:id])
    respond_with @raio.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def raio_params
    params.require(:raio).permit(:valor)
  end
end
