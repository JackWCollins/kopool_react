require 'test_helper'

class WebStateTest < ActiveSupport::TestCase
  test "can advance to next week" do
    web_state = web_states(:current)
    this_week = web_state.week
    next_week_number = this_week.week_number + 1
    next_week = Week.where(season: web_state.season).where(week_number: next_week_number).first
    web_state.move_to_next_week!
    assert_equal next_week, web_state.reload.week
    assert next_week.open_for_picks
  end

  test "advancing a week on the last week of the season will not fail" do
    web_state = web_states(:current)
    this_week = web_state.week
    this_week.update_attributes!(week_number: Season::WEEKS_IN_SEASON) # last week
    web_state.move_to_next_week!
    assert_equal this_week, web_state.reload.week # Current week did not change
  end
end