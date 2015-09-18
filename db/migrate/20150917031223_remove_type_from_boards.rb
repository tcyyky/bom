class RemoveTypeFromBoards < ActiveRecord::Migration
  def change
    remove_column :boards, :type, :integer
  end
end
