class Week < ApplicationRecord
  has_many :matchups
  has_many :picks
  belongs_to :season
  belongs_to :default_team, class_name: 'NflTeam'

  validates_presence_of :start_date, :end_date, :deadline, :season_id
  validates :week_number, uniqueness: {scope: :season_id}, presence: true

  def close_week_for_picks!
    # TODO: Allow admin to notify users that the week has been closed for picks.
    self.update_attributes!(open_for_picks: false)
  end

  def reopen_week_for_picks!
    self.update_attributes!(open_for_picks: true)
  end
end
