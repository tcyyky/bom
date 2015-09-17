class AddBookTypeToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :back_type, :integer
  end
end
