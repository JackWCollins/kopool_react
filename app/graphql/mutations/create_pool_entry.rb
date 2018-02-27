class Mutations::CreatePoolEntry < GraphQL::Function
  argument :team_name, !types.String

  type Types::PoolEntryType

  def call(obj, args, context)
    # Raise an exception if there is no user present
    user = context[:current_user]
    if user.blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    web_state = WebState.first
    unless web_state.season.open_for_registration
      raise GraphQL::ExecutionError.new("Sorry, we are no longer accepting new pool entries for this season.")
    end

    pool_entry = user.pool_entries.create(team_name: args[:team_name], season: web_state.season)

    if pool_entry.errors.present?
      message = pool_entry.errors.full_messages.first
      raise GraphQL::ExecutionError.new(message)
    else
      pool_entry
    end
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("There was an error saving your pick. Please refresh and try again.")
  end
end