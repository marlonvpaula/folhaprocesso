class SuporteInsertosController < ApplicationController

	def index
    respond_with SuporteInserto.all
  end

  def create
    respond_with SuporteInserto.create(suporte_inserto_params)
  end

  def show
    respond_with SuporteInserto.find(params[:id])
  end

  def destroy
    @suporteInserto = SuporteInserto.find(params[:id])
    respond_with @suporteInserto.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def suporte_inserto_params
    params.require(:suporte_inserto).permit(:suporte_id, :inserto_id)
  end

end
