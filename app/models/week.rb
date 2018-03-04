class Week < ApplicationRecord
  has_many :matchups
  has_many :picks
  belongs_to :season
  belongs_to :default_team, class_name: 'NflTeam'

  SQL_DOW_MONDAY = 1

  validates_presence_of :start_date, :end_date, :deadline, :season_id
  validates :week_number, uniqueness: {scope: :season_id}, presence: true

  def self.autopick_matchup_during_week(week_id)
    Matchup.where(week_id: week_id).where('EXTRACT (dow from game_time) = ?', SQL_DOW_MONDAY).order(:game_time).first
  end

  def close_week_for_picks!
    self.update_attributes!(open_for_picks: false)
  end

  def reopen_week_for_picks!
    self.update_attributes!(open_for_picks: true)
  end
end
