class MatchupProcessor
  def initialize(matchup_id)
    @matchup = Matchup.find_by_id(matchup_id)
  end

  def process_winning_team(winning_team_id)
    if @matchup.blank?
      @matchup = Matchup.new
      @matchup.errors.add(:base, "Please specify the matchup that you'd like to score.")
    end

    @matchup.update_attributes(winning_team_id: winning_team_id, completed: true, tie: false)
    return @matchup if @matchup.errors.present?

    @matchup.picks.each do |pick|
      if pick.team_id == @matchup.winning_team_id
        update_winning_pick(pick)
      else
        update_losing_pick(pick)
      end
      # TODO: Send an email to the user based on the status of their pick
    end
    @matchup
  end

  def process_tie_game
    if @matchup.blank?
      @matchup = Matchup.new
      @matchup.errors.add(:base, "Please specify the matchup that you'd like to score.")
    end

    @matchup.update_attributes(winning_team_id: nil, completed: true, tie: true)
    return @matchup if @matchup.errors.present?

    @matchup.picks.each do |pick|
      update_losing_pick(pick)
    end
    @matchup
  end

  private

  def update_winning_pick(pick)
    pick.update_attributes!(status: 'won')
  end

  def update_losing_pick(pick)
    pick.update_attributes!(status: 'lost')
    pick.pool_entry.update_attributes!(knocked_out: true, knocked_out_week_id: @matchup.week_id)
  end
end