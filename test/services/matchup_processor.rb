require 'test_helper'

class MatchupProcessorTest < ActiveSupport::TestCase

  test "can process a completed game with no picks" do
    matchup = matchups(:vikings_bears)
    matchup.picks.destroy_all
    winning_team = nfl_teams(:vikings)
    processed_matchup = MatchupProcessor.new(matchup).process_winning_team(winning_team.id)
    assert processed_matchup.present?
    assert processed_matchup.completed
    refute processed_matchup.tie
    assert_equal winning_team.id, processed_matchup.winning_team_id
  end

  test "can process a completed game and score picks" do
    matchup = matchups(:vikings_bears)
    winning_team = nfl_teams(:vikings)
    losing_team = nfl_teams(:bears)
    vikings_pick = picks(:jack_week_1_vikings)
    bears_pick = picks(:dave_week_1_bears)
    assert_equal [vikings_pick], matchup.picks.where(team_id: winning_team)
    assert_equal [bears_pick], matchup.picks.where(team_id: losing_team)
    processed_matchup = MatchupProcessor.new(matchup).process_winning_team(winning_team.id)
    assert processed_matchup.present?
    assert processed_matchup.completed
    refute processed_matchup.tie
    assert_equal winning_team.id, processed_matchup.winning_team_id
    vikings_pick.reload
    bears_pick.reload
    assert_equal 'won', vikings_pick.status
    assert_equal 'lost', bears_pick.status
    assert bears_pick.pool_entry.knocked_out
    assert_equal matchup.week_id, bears_pick.pool_entry.knocked_out_week_id
  end

  test "can process a tie game and score picks" do
    matchup = matchups(:vikings_bears)
    vikings = nfl_teams(:vikings)
    bears = nfl_teams(:bears)
    vikings_pick = picks(:jack_week_1_vikings)
    bears_pick = picks(:dave_week_1_bears)
    assert_equal [vikings_pick], matchup.picks.where(team_id: vikings)
    assert_equal [bears_pick], matchup.picks.where(team_id: bears)
    processed_matchup = MatchupProcessor.new(matchup).process_tie_game
    assert processed_matchup.present?
    assert processed_matchup.completed
    assert processed_matchup.tie
    assert_nil processed_matchup.winning_team_id
    vikings_pick.reload
    bears_pick.reload
    assert_equal 'lost', vikings_pick.status
    assert vikings_pick.pool_entry.knocked_out
    assert_equal matchup.week_id, vikings_pick.pool_entry.knocked_out_week_id
    assert_equal 'lost', bears_pick.status
    assert bears_pick.pool_entry.knocked_out
    assert_equal matchup.week_id, bears_pick.pool_entry.knocked_out_week_id
  end
end