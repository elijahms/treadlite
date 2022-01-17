class User < ApplicationRecord
  has_secure_password
  validates :password,
            :first_name,
            :last_name,
            :password_confirmation,
            :email,
            presence: true
  validates :email, uniqueness: true
  has_one :userrecord, dependent: :destroy

  has_many :received_follows, foreign_key: :followed_user_id, class_name: "Friendship"
  # returns an array of follows a user gave to someone else
  has_many :given_follows, foreign_key: :follower_id, class_name: "Friendship"
  # Will return an array of users who follow the user instance
  has_many :followers, through: :received_follows, source: :follower
    # returns an array of other users who the user has followed
  has_many :followings, through: :given_follows, source: :followed_user

end

## https://betterprogramming.pub/how-to-create-a-follow-feature-in-rails-by-aliasing-associations-30d63edee284
