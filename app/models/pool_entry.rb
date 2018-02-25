class PoolEntry < ApplicationRecord
  has_many :picks
  has_many :payments
  belongs_to :user
  belongs_to :season

  validates_uniqueness_of :team_name, scope: :season_id

  validates_presence_of :user_id
  validates_presence_of :team_name
  validates_presence_of :season_id

  def self.needs_autopicking(week)
    pools_have_picked = Pick.where(week_id: week.id).pluck(:pool_entry_id)
    PoolEntry.where(season: week.season).where(knocked_out: false).where.not(id: pools_have_picked).order(:id)
  end

  def most_recent_picks_nfl_team(week)
    @pick = Pick
                .where(pool_entry_id: self.id)
                .joins(:week)
                .where('weeks.season_id = ?',week.season_id)
                .where('week_id <= ?', week)
                .order('week_id DESC').first
    return {} unless @pick.present?
    @returned_nfl_team = {nfl_team_id: @pick.team_id, logo_url_small: @pick.nfl_team.logo_url_small, nfl_team_name: @pick.nfl_team.name}
  end

  def specific_weeks_nfl_team(week)
    @pick = Pick
                .where(pool_entry_id: self.id)
                .joins(:week)
                .where('weeks.season_id = ?',week.season_id)
                .where('week_id = ?', week).first
    return {} unless @pick.present?
    @returned_nfl_team = {nfl_team_id: @pick.team_id, logo_url_small: @pick.nfl_team.logo_url_small, nfl_team_name: @pick.nfl_team.name}
  end

  def matchup_locked?(week)
    @pick = Pick
                .where(pool_entry_id: self.id)
                .joins(:week)
                .where('weeks.season_id = ?',week.season_id)
                .where('week_id = ?', week).first
    return false unless @pick.present?
    !!@pick.matchup.locked
  end

  def user_information
    @user = self.user
    @returned_user = {name: @user.name, phone: @user.phone}
  end

  def current_week_pick
    current_week = WebState.first.week
    picks.where(week_id: current_week.id).first
  end

end
