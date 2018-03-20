class PoolEntry < ApplicationRecord
  has_many :picks
  has_many :payments
  belongs_to :user
  belongs_to :season

  validates_uniqueness_of :team_name, scope: :season_id
  validates_presence_of :user_id, :team_name, :season_id

  def current_week_pick
    current_week = WebState.first.week
    picks.where(week_id: current_week.id).first
  end
end
