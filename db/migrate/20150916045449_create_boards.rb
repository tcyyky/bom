class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :image
      t.text :caption
      t.float :latitude
      t.float :longitude
      t.integer :good
      t.integer :bad
      t.string :username

      t.timestamps null: false
    end
  end
end
