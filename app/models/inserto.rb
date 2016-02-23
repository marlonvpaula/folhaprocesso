class Inserto < ActiveRecord::Base
	has_many :inserto_fabricantes, :dependent => :delete_all
	has_many :fabricante, :through => :inserto_fabricantes
	accepts_nested_attributes_for :inserto_fabricantes

	def as_json(options = {})
    super(options.merge(include: [inserto_fabricantes: {include: :fabricante}]))
  end
end