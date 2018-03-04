class PoolEntry < ApplicationRecord
  has_many :picks
  has_many :payments
  belongs_to :user
  belongs_to :season

  validates_uniqueness_of :team_name, scope: :season_id
  validates_presence_of :user_id, :team_name, :season_id

  def self.needs_autopicking(week)
    pools_have_picked = Pick.where(week_id: week.id).pluck(:pool_entry_id)
    PoolEntry.where(season: week.season).where(knocked_out: false).where.not(id: pools_have_picked).order(:id)
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
