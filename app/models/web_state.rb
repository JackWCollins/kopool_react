class WebState < ApplicationRecord

  belongs_to :week
  belongs_to :season

  validate :only_one_record?, :on => :create
  validate :season_matches_week, :on => :update

  delegate :open_for_picks, to: :current_week

  private

  def only_one_record?
    self.errors[:base] << "There can only be one WebState record" if WebState.count > 0
  end

  def season_matches_week
    unless week.season_id == season.id
      self.errors[:base] << "Current week must be in the current season."
    end
  end
end

