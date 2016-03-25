class Desenho < ActiveRecord::Base
  belongs_to :modelo
  belongs_to :grupomodelo

  def as_json(options = {})
    super(options.merge(include: [:grupomodelo, :modelo]))
  end
end
