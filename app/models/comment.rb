class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :board

  validates :body, presence: true
end
