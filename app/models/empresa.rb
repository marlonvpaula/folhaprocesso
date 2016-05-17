class Empresa < ActiveRecord::Base
  
  mount_uploader :logo, AvatarUploader

  def as_json(options = {})
    super(options.merge(include: [:logo]))
  end
end
