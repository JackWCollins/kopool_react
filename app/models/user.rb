class User < ApplicationRecord
  has_secure_password

  after_create :send_welcome_email

  has_many :pool_entries

  validates_presence_of :name
  validates :email, presence: true, uniqueness: true

end
