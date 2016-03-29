class Comandofolha < ActiveRecord::Base
  belongs_to :folhaprocesso
  belongs_to :comando
end
