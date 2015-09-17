# coding: utf-8
class Board < ActiveRecord::Base
  belongs_to :username
  # attr_accessible :image # モデルではなく，コントローラでパラメータをフィルタリングする

  mount_uploader :image, ImageUploader

  enum back_type: %i(/assets/minisign_b.png /assets/minisign_y.png /assets/minisign_r.png)
end
