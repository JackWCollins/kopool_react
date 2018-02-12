require 'test_helper'

class MatchupTest < ActiveSupport::TestCase
  test "matchup has correct graphQL fields" do
    matchup = KopoolReactSchema.types["Matchup"]
    assert_equal ["id", "game_time", "locked", "completed", "tie", "week", "home_team", "away_team", "winning_teaim"], matchup.fields.keys
  end
end