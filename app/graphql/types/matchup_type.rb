Types::MatchupType = GraphQL::ObjectType.define do
  name 'Matchup'
  description 'A game between two NFL teams'

  field :id, !types.ID
  field :game_time, !Types::DateTimeType
  field :locked, !types.Boolean
  field :completed, !types.Boolean
  field :tie, !types.Boolean
  field :week, -> { Types::WeekType }
  field :home_team, -> { Types::NflTeamType }
  field :away_team, -> { Types::NflTeamType }
  field :winning_team, -> { Types::NflTeamType }
end