require 'test_helper'

class UserPoolEntriesTest < ActiveSupport::TestCase
  test "without a week_id argument, will grab the week_pick for the current week" do
    context = {current_user: users(:jack)}
    variables = {}
    week = weeks(:one)
    pe_1 = pool_entries(:jack_1)

    # provide a query string for `result`
    query_string =  %|
      query UserWeekPicksQuery {
        userPoolEntries {
          id
          team_name
          week_pick(week_id: #{week.id}) {
            id
            locked_in
            auto_picked
            nfl_team {
              id
              name
            }
          }
        }
      }
    |

    result = KopoolReactSchema.execute(
      query_string,
      context: context,
      variables: variables
    )
    jack_pe_1 = result['data']['userPoolEntries'].detect{|data| data['id'].to_i == pe_1.id}
    assert_equal pe_1.picks.where(week_id: week.id).first.id, jack_pe_1['week_pick']['id'].to_i
  end
end