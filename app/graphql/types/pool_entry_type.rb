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
  field :current_week_pick, -> { Types::PickType }
end