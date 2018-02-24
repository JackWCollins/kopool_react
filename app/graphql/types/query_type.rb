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
end
