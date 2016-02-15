class InsertoFabricante < ActiveRecord::Base
  belongs_to :fabricante
  belongs_to :inserto
end
