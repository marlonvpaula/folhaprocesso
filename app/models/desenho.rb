class Desenho < ActiveRecord::Base
  belongs_to :modelo
  belongs_to :grupomodelo

  mount_uploader :picture, AvatarUploader

  def as_json(options = {})
    super(options.merge(include: [:grupomodelo, :modelo, :picture]))
  end
end
