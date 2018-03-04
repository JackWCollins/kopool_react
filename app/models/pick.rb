class Pick < ApplicationRecord
  belongs_to :week
  belongs_to :nfl_team, foreign_key: :team_id
  belongs_to :pool_entry
  belongs_to :matchup

  validates_presence_of :team_id, :pool_entry_id, :week_id, :matchup_id
  validates_uniqueness_of :pool_entry_id, scope: :week_id

  validate :cannot_change_locked_in_pick, :on => :update
  validate :cannot_change_knocked_out_pick, :on => :update
  validate :cannot_change_pick_during_closed_week, :on => :update
  validate :pick_must_be_in_matchup

  enum status: {
    in_play: 0,
    won:     1,
    lost:    2
  }

  def user
    pool_entry.user
  end

  private

  def pick_must_be_in_matchup
    return true if (matchup.home_team_id == team_id || matchup.away_team_id == team_id)
    self.errors[:base] << "You cannot choose a team that is not playing in this matchup."
  end

  def cannot_change_locked_in_pick
    if locked_in? && changed_attributes['team_id'].present?
      self.errors[:base] << "You cannot change a locked_in pick."
    end
  end

  def cannot_change_knocked_out_pick
    if pool_entry.knocked_out? && changed_attributes['team_id'].present?
      self.errors[:base] << "You cannot change a pick when knocked out."
    end
  end

  def cannot_change_pick_during_closed_week
    if !week.open_for_picks? && changed_attributes['team_id'].present?
      self.errors[:base] << "You cannot change a pick when the week is closed."
    end
  end
end
