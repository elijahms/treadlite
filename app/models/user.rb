class User < ApplicationRecord
  has_secure_password
  validates :password,
            :first_name,
            :last_name,
            :password_confirmation,
            :email,
            presence: true
  validates :email, uniqueness: true
end
