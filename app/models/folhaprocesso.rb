class Folhaprocesso < ActiveRecord::Base
  belongs_to :operacao
  belongs_to :programador
  belongs_to :desenho
  has_many :ferramentafolhas, :dependent => :delete_all
  has_many :acessoriofolhas, :dependent => :delete_all
  has_many :comandofolhas, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge({include: [:operacao, :programador, 
            {desenho: {include: [:modelo, :grupomodelo]}},            
            {ferramentafolhas: {include: [:suporte, :inserto, :fabricante]}},
      	    {acessoriofolhas: {include: [:acessorio]}},
      	    {comandofolhas: {include: [:comando]}},
    	    ]}))
    
  end
end
