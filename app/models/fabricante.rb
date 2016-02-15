class Fabricante < ActiveRecord::Base
	has_many :inserto_fabricante
	has_many :inserto, :through => :inserto_fabricante
end
