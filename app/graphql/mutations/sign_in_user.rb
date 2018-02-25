class Mutations::SignInUser < GraphQL::Function
  # define the arguments that this field will receive
  argument :email, !types.String
  argument :password, !types.String

  # define inline return type for the mutation
  type do
    name 'SignInPayload'

    field :token, types.String
    field :user, Types::UserType
  end

  def call(obj, args, context)
    if args[:email].blank? || args[:password].blank?
      raise GraphQL::ExecutionError.new("Please enter both an email and password.")
    end

    user = User.find_by(email: args[:email])
    if user.blank?
      raise GraphQL::ExecutionError.new("Sorry, we could not find a user with that email address. If you need to register a new account please click the Register link below.")
    end
    unless user.authenticate(args[:password])
      raise GraphQL::ExecutionError.new("Whoops! Looks like that password is not correct.")
    end

    OpenStruct.new({
      token: AuthToken.token(user),
      user: user
     })
  end
end