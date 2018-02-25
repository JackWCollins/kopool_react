class Mutations::CreatePick < GraphQL::Function
  argument :nfl_team_id, !types.Int
  argument :pool_entry_id, !types.Int
  argument :week_id, !types.Int
  argument :matchup_id, !types.Int

  type Types::PickType

  def call(obj, args, context)
    # Raise an exception if there is no user present
    user = context[:current_user]
    if user.blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    picked_team = NflTeam.find_by(id: args[:nfl_team_id])
    week = Week.find_by(id: args[:week_id])
    matchup = Matchup.find_by(id: args[:matchup_id])
    pool_entry = user.pool_entries.where(id: args[:pool_entry_id])

    if pool_entry.blank?
      raise GraphQL::ExecutionError.new("We couldn't find the pool entry for this pick.")
    end

    pick = pool_entry.picks.where(week: week).first_or_initialize
    pick.assign_attributes(team: picked_team, matchup: matchup)
    pick.save!

    pick
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("There was an error saving your pick. Please refresh and try again.")
  end
end