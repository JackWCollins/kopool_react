Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :users, !types[Types::UserType] do
    description "Return all users"
    argument :limit, types.Int, default_value: 50, prepare: -> (limit, context) { [limit, 30].min }
    resolve ->(obj, args, context) {
      User.all
    }
  end

  field :nflTeams, !types[Types::NflTeamType] do
    description "Return all NFL Teams"
    argument :limit, types.Int, default_value: 50, prepare: -> (limit, context) { [limit, 30].min }
    resolve ->(obj, args, context) {
      NflTeam.all
    }
  end

  field :webState, !Types::WebStateType do
    description "Returns the active web state"
    resolve ->(obj, args, context) {
      WebState.first
    }
  end

  field :userPoolEntries, !types[Types::PoolEntryType] do
    description "Loads up the user's pool entries"
    argument :week_id, types.Int
    resolve ->(obj, args, context) {
      user = context[:current_user]
      if user.blank?
        raise GraphQL::ExecutionError.new("Authentication required")
      end
      user.pool_entries
    }
  end

  field :poolEntry, !Types::PoolEntryType do
    description "Return a single pool entry"
    argument :id, !types.ID
    resolve ->(obj, args, context) {
      PoolEntry.find_by_id(args[:id])
    }
  end
end
