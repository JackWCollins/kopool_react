class NflTeam < ApplicationRecord
  validates_presence_of :name, :conference, :division

  def logo_url_small
    logo.url(:thumb)
  end
end
