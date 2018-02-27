Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :signInUser, function: Mutations::SignInUser.new
  field :createUser, function: Mutations::CreateUser.new
  field :createPick, function: Mutations::CreatePick.new
  field :createPoolEntry, function: Mutations::CreatePoolEntry.new
  field :updatePoolEntry, function: Mutations::UpdatePoolEntry.new
end
