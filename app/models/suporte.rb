class Suporte < ActiveRecord::Base
	has_many :suporte_insertos, :dependent => :delete_all
	has_many :inserto, :through => :suporte_insertos
	accepts_nested_attributes_for :suporte_insertos

	belongs_to :operacao

	def as_json(options = {})
    super(options.merge(include: [:operacao, suporte_insertos: {include: :inserto}]))
  end
end
