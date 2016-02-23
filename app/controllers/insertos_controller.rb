class InsertosController < ApplicationController

	def index
    respond_with Inserto.all
  end

  def create
    #respond_with Inserto.create(inserto_params)
    @inserto = Inserto.new(inserto_params)
    if @inserto.save
      params[:fabricantes].each do |a|
        @inserto_fab = @inserto.inserto_fabricantes.create!(:fabricante_id => a['id'])
      end
    end
    respond_with @inserto
  end

  def show
    respond_with Inserto.find(params[:id])
  end

  def destroy
    @inserto = Inserto.find(params[:id])
    respond_with @inserto.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def inserto_params
    params.require(:inserto).permit(:descricao, fabricantes_attributes: [:id, :descricao])
  end

end
