class Matchup < ApplicationRecord
  belongs_to :home_team, class_name: "NflTeam"
  belongs_to :away_team, class_name: "NflTeam"
  belongs_to :week
  has_many :picks
  validates_presence_of :week
  validates_presence_of :home_team
  validates_presence_of :away_team
end
