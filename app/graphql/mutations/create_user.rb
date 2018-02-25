class Mutations::CreateUser < GraphQL::Function
  argument :name, !types.String
  argument :email, !types.String
  argument :password, !types.String
  argument :password_confirmation, !types.String

  # define inline return type for the mutation
  type do
    name 'CreateUserPayload'

    field :token, types.String
    field :user, Types::UserType
  end

  def call(obj, args, context)
    web_state = WebState.first
    unless web_state.season.open_for_registration
      raise GraphQL::ExecutionError.new("Sorry, this season is closed to new registrations.")
    end

    unless ['name', 'email', 'password', 'password_confirmation'].all?{|param| args.keys.include?(param)}
      raise GraphQL::ExecutionError.new("Please enter a value for each field.")
    end
    user = User.create(
      name: args[:name],
      email: args[:email],
      password: args[:password],
      password_confirmation: args[:password_confirmation]
    )

    if user.errors.present?
      message = user.errors.full_messages.first
      raise GraphQL::ExecutionError.new(message)
    end

    OpenStruct.new({
       token: AuthToken.token(user),
       user: user
    })
  end
end