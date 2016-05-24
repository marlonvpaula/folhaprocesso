class Desenho < ActiveRecord::Base
  belongs_to :modelo
  belongs_to :grupomodelo
  validates_uniqueness_of :codigo, :scope => :empresa_id
  mount_uploader :picture, AvatarUploader

  def as_json(options = {})
    super(options.merge(include: [:grupomodelo, :modelo, :picture]))
  end
end
