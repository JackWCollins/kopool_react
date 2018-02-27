require 'test_helper'

class Mutations::CreatePoolEntryTest < ActiveSupport::TestCase
  def perform(args={}, context={})
    Mutations::CreatePoolEntry.new.call(nil, args, context)
  end

  test 'create new pool entry when the season is open for registration' do
    user = users(:jack)
    result = perform(
      {team_name: "Test Entry 1"},
      {current_user: user}
    )

    assert result.present?
    new_pe_id = result.id

    new_pool_entry = PoolEntry.find(new_pe_id)
    assert_equal "Test Entry 1", new_pool_entry.team_name
  end

  test 'create new pool with no team name will return an error' do
    user = users(:jack)
    assert_raises(GraphQL::ExecutionError) {
      perform(
        {team_name: ""},
        {current_user: user}
      )
    }
  end

  test 'create new pool entry without valid user will return an error' do
    assert_raises(GraphQL::ExecutionError) {
      perform(
        {team_name: "Test Entry 1"},
        {current_user: nil}
      )
    }
  end

  test 'create new pool entry when the season is not open for registration will return an error' do
    user = users(:jack)
    web_state = WebState.first
    web_state.season.update_attributes!(open_for_registration: false)
    assert_raises(GraphQL::ExecutionError) {
      perform(
        {team_name: "Test Entry 1"},
        {current_user: user}
      )
    }
  end
end