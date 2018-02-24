Types::WeekType = GraphQL::ObjectType.define do
  name 'Week'
  description 'A full week of NFL matchups'

  field :id, !types.ID
  field :week_number, !types.Int
  field :open_for_picks, types.Boolean
  field :start_date, Types::DateTimeType
  field :end_date, Types::DateTimeType
  field :deadline, Types::DateTimeType
  field :active_for_scoring, types.Boolean
  field :default_team, -> { Types::NflTeamType }
  field :season, -> { Types::SeasonType }
end