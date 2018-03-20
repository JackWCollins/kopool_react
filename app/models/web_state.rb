class WebState < ApplicationRecord

  belongs_to :week
  belongs_to :season

  validate :only_one_record, :on => :create
  validate :season_matches_week, :on => :update

  delegate :open_for_picks, to: :current_week

  def move_to_next_week!
    this_week = week
    if this_week.week_number == Season::WEEKS_IN_SEASON
      return # We have reached the end of the season
    end

    this_week.close_week_for_picks!
    next_week_number = this_week.week_number + 1
    next_week = Week.where(season: season).where(week_number: next_week_number).first
    self.update_attributes!(week_id: next_week.id)
    next_week.reopen_week_for_picks!
  end

  private

  def only_one_record
    # We use a single `WebState` record to manage the global state of the app
    self.errors[:base] << "There can only be one WebState record" if WebState.count > 0
  end

  def season_matches_week
    unless week.season_id == season.id
      self.errors[:base] << "Current week must be in the current season."
    end
  end
end

