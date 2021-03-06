class SuportesController < ApplicationController
  before_filter :authenticate_user!
  
	def index
    respond_with Suporte.where(empresa_id: current_user.empresa_id)
  end

  def create
    #respond_with Suporte.create(inserto_params)
    @suporte = Suporte.new(suporte_params)
    @suporte.empresa_id = current_user.empresa_id
    @suporte.user_id = current_user.id
    if @suporte.save
      params[:insertos].each do |a|
        @inserto_fab = @suporte.suporte_insertos.create!(:inserto_id => a['id'])
      end
    end
    respond_with @suporte
  end

  def update
    #respond_with Suporte.create(inserto_params)
    @suporte = Suporte.where(empresa_id: current_user.empresa_id).find(params[:id])
    @suporte.suporte_insertos.each do |fab|
      fab.destroy
    end

    if @suporte.update(suporte_params)
      params[:insertos].each do |a|
        @inserto_fab = @suporte.suporte_insertos.create!(:inserto_id => a['id'])
      end
    end
    respond_with @suporte
  end

  def show
    respond_with Suporte.where(empresa_id: current_user.empresa_id).find(params[:id])
  end

  def destroy
    @suporte = Suporte.where(empresa_id: current_user.empresa_id).find(params[:id])
    respond_with @suporte.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def suporte_params
    params.require(:suporte).permit(:descricao, :operacao_id, insertos_attributes: [:id, :descricao])
  end

end
