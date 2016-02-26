class SuportesController < ApplicationController

	def index
    respond_with Suporte.all
  end

  def create
    #respond_with Suporte.create(inserto_params)
    @suporte = Suporte.new(suporte_params)
    if @suporte.save
      params[:insertos].each do |a|
        @inserto_fab = @suporte.suporte_insertos.create!(:inserto_id => a['id'])
      end
    end
    respond_with @suporte
  end

  def show
    respond_with Suporte.find(params[:id])
  end

  def destroy
    @suporte = Suporte.find(params[:id])
    respond_with @suporte.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def suporte_params
    params.require(:suporte).permit(:descricao, :operacao_id, insertos_attributes: [:id, :descricao])
  end

end
