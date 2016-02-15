class Inserto < ActiveRecord::Base
	has_many :inserto_fabricante
	has_many :fabricante, :through => :inserto_fabricante
end