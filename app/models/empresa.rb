class Empresa < ActiveRecord::Base
  
  mount_uploader :logo, AvatarUploader

end
