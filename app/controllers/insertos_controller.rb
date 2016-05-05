class InsertosController < ApplicationController
  before_filter :authenticate_user!
  
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

  def update
    #respond_with Inserto.create(inserto_params)
    @insertof = Inserto.find(params[:id])
    @insertof.inserto_fabricantes.each do |fab|
      fab.destroy
    end

    #@inserto = Inserto.new(inserto_params)
    if @insertof.update(inserto_params)
      params[:fabricantes].each do |a|
        @inserto_fab = @insertof.inserto_fabricantes.create!(:fabricante_id => a['id'])
      end
    end
    respond_with @insertof
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
    params.require(:inserto).permit(:descricao, :raio, fabricantes_attributes: [:id, :descricao])
  end

end
