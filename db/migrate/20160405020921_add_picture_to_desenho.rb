class AddPictureToDesenho < ActiveRecord::Migration
  def change
  	add_column :desenhos, :picture, :string
  end
end
