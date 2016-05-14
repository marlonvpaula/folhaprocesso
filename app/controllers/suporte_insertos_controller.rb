class SuporteInsertosController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with SuporteInserto.where(empresa_id: current_user.empresa_id)
  end

  def create
    @suporteInserto = SuporteInserto.create(suporte_inserto_params)
    @suporteInserto.empresa_id = current_user.empresa_id
    @suporteInserto.user_id = current_user.id
    @suporteInserto.save
    respond_with @suporteInserto
  end

  def show
    respond_with SuporteInserto.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @suporteInserto = SuporteInserto.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @suporteInserto.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def suporte_inserto_params
    params.require(:suporte_inserto).permit(:suporte_id, :inserto_id)
  end

end
