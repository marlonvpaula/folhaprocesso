class Modelo < ActiveRecord::Base
  belongs_to :grupomodelo

  def as_json(options = {})
    super(options.merge(include: [:grupomodelo]))
  end
end
