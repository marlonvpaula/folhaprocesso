class FolhaprocessosController < ApplicationController
	def index
    if params['item_per_page'].present?
      items_per_page = parms['item_per_page']
    end
    
    if params['order'].present?
      sort = case params['order']
             when "id"  then "id"
             when "nomepeca"  then "nomepeca"
             when "qty"   then "quantity"
             when "price" then "price"
             when "name_reverse"  then "name DESC"
             when "qty_reverse"   then "quantity DESC"
             when "price_reverse" then "price DESC"
             end
    end


    if params['order'].present?
      respond_with Folhaprocesso.order(sort).all
    else
      respond_with Folhaprocesso.all
    end



  end

  def create
    @folhaprocesso = Folhaprocesso.new(folhaprocesso_params)
    if @folhaprocesso.save
      params[:ferramentafolhas].each do |a|
        @ferramenta = @folhaprocesso.ferramentafolhas.create!(:posicao       => a['posicao'],
                                                              :suporte_id    => a['suporte_id'],
                                                              :inserto_id    => a['inserto_id'], 
                                                              :fabricante_id => a['fabricante_id'],
                                                              :altura        => a['altura'])
      end
      params[:acessoriofolhas].each do |a|
        @acessorio = @folhaprocesso.acessoriofolhas.create!(:acessorio_id    => a['id'])
      end
      params[:comandofolhas].each do |a|
        @comando = @folhaprocesso.comandofolhas.create!(:comando_id    => a['id'])
      end
    end
    respond_with @folhaprocesso
  end

  def show
    
    respond_with Folhaprocesso.find(params[:id])
    

  end

  def update

    @folhaprocesso = Folhaprocesso.find(params[:id])
    @folhaprocesso.ferramentafolhas.each do |fer|
      fer.destroy
    end
    @folhaprocesso.acessoriofolhas.each do |ace|
      ace.destroy
    end
    @folhaprocesso.comandofolhas.each do |com|
      com.destroy
    end

    if @folhaprocesso.update(folhaprocesso_params)
      params[:ferramentafolhas].each do |a|
        @ferramenta = @folhaprocesso.ferramentafolhas.create!(:posicao       => a['posicao'],
                                                              :suporte_id    => a['suporte_id'],
                                                              :inserto_id    => a['inserto_id'], 
                                                              :fabricante_id => a['fabricante_id'],
                                                              :altura        => a['altura'])
      end
      params[:acessoriofolhas].each do |a|
        @acessorio = @folhaprocesso.acessoriofolhas.create!(:acessorio_id    => a['id'])
      end
      params[:comandofolhas].each do |a|
        @comando = @folhaprocesso.comandofolhas.create!(:comando_id    => a['id'])
      end
    end
    
    respond_with @folhaprocesso
  end

  def destroy
    @folhaprocesso = Folhaprocesso.find(params[:id])
    respond_with @folhaprocesso.destroy
    #@operacao, location: -> { admin_clientes_path }
  end

  private
  def folhaprocesso_params
    params.require(:folhaprocesso).permit(:nomepeca, :dtProjeto, :dtVerificacao, :tempo,
    	                                    :operacao_id, :programador_id, :desenho_id,
    	                                    ferramentafolhas_attributes: [:id, :posicao, :suporte_id, :inserto_id, 
                                                                        :fabricante_id, :altura],
                                          acessoriofolhas_attributes: [:id, :acessorio_id],
                                          comandofolhas_attributes: [:id, :comando_id])
  end
end
