class User < ActiveRecord::Base
  belongs_to :board
  belongs_to :comment
end
