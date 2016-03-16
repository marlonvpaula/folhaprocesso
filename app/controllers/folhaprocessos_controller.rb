class FolhaprocessosController < ApplicationController
	def index
    respond_with Folhaprocesso.all
  end

  def create
    @folhaprocesso = Folhaprocesso.new(folhaprocesso_params)
    if @folhaprocesso.save
      params[:ferramentafolhas].each do |a|
        @ferramenta = @folhaprocesso.ferramentafolhas.create!(:suporte_id => a['suporte_id'],
                                                              :inserto_id => a['inserto_id'], 
                                                              :fabricante_id => a['fabricante_id'], 
                                                              :raio_id => a['raio_id'])
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

    if @folhaprocesso.update(folhaprocesso_params)
      params[:ferramentafolhas].each do |a|
        @ferramenta = @folhaprocesso.ferramentafolhas.create!(:suporte_id => a['suporte_id'],
                                                              :inserto_id => a['inserto_id'], 
                                                              :fabricante_id => a['fabricante_id'], 
                                                              :raio_id => a['raio_id'])
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
    params.require(:folhaprocesso).permit(:nrDesenho, :nomepeca, :dtProjeto, :dtVerificacao, 
    	                                    :grupomodelo_id, :modelo_id, 
    	                                    ferramentafolhas_attributes: [:id, :suporte_id, :inserto_id, 
                                                                        :fabricante_id, :raio_id])
  end
end
