class Folhaprocesso < ActiveRecord::Base
  belongs_to :grupomodelo
  belongs_to :modelo
  has_many :ferramentafolhas, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge(include: [:grupomodelo, :modelo, ferramentafolhas: {include: [:suporte, :inserto, :fabricante, :raio]}]))
  end
end
