class Fabricante < ActiveRecord::Base
	has_many :inserto_fabricantes
	has_many :inserto, :through => :inserto_fabricantes
end
