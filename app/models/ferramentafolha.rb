class Ferramentafolha < ActiveRecord::Base
  belongs_to :folhaprocesso
  belongs_to :suporte
  belongs_to :inserto
  belongs_to :fabricante
  belongs_to :raio
end
