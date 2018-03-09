Types::PoolEntryType = GraphQL::ObjectType.define do
  name 'PoolEntry'
  description 'A single entry into the pool this season'

  field :id, !types.ID
  field :team_name, !types.String
  field :paid, types.Boolean
  field :knocked_out, types.Boolean
  field :knocked_out_week, -> { Types::WeekType }
  field :season, -> { Types::SeasonType }
  field :picks, -> { Types::PickType }
  field :week_pick, Types::PickType do
    argument :week_id, types.ID
    resolve ->(obj, args, context) {
      if args['week_id'].present?
        obj.picks.where(week_id: args['week_id']).first
      else
        obj.picks.where(week_id: WebState.first.week_id).first
      end
    }
  end
end