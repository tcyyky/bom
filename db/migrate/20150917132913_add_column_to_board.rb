class AddColumnToBoard < ActiveRecord::Migration
  def change
    add_column :boards, :remove_image, :boolean
    add_column :boards, :image_cache, :string
  end
end
