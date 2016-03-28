class Folhaprocesso < ActiveRecord::Base
  belongs_to :operacao
  belongs_to :programador
  belongs_to :desenho
  has_many :ferramentafolhas, :dependent => :delete_all

  def as_json(options = {})
    super(options.merge(include: [:operacao, :programador, :desenho, ferramentafolhas: {include: [:suporte, :inserto, :fabricante]}]))
  end
end
