class Mutations::DeletePoolEntry < GraphQL::Function
  argument :id, !types.ID

  type Types::PoolEntryType

  def call(obj, args, context)
    # Raise an exception if there is no user present
    user = context[:current_user]
    if user.blank?
      raise GraphQL::ExecutionError.new("Authentication required")
    end

    web_state = WebState.first
    unless web_state.season.open_for_registration
      raise GraphQL::ExecutionError.new("Sorry, you can no longer delete this pool entry.")
    end

    pool_entry = user.pool_entries.where(id: args[:id]).first
    pool_entry.destroy

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