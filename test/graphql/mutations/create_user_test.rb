require 'test_helper'

class Mutations::CreateUserTest < ActiveSupport::TestCase
  def perform(args={})
    Mutations::CreateUser.new.call(nil, args, nil)
  end

  test 'create new user during registration will succeed with correct params' do
    result = perform(
      name: 'Test User',
      email: 'email@example.com',
      password: 'password',
      password_confirmation: 'password'
    )

    assert result.present?
    assert result.token.present?
    new_user_id = result.user.id

    new_user = User.find(new_user_id)
    assert_equal 'Test User', new_user.name
    assert_equal 'email@example.com', new_user.email
  end

  test 'create new user during registration will NOT succeed if the season is not open for registration' do
    web_state = WebState.first
    web_state.season.update_attributes!(open_for_registration: false)

    assert_raises(GraphQL::ExecutionError) {
      perform(
        name: 'Test User',
        email: 'email@example.com',
        password: 'password',
        password_confirmation: 'password'
      )
    }
  end

  test 'create new user during registration without required params will return an error' do
    user_count = User.all.count
    assert_raises(GraphQL::ExecutionError) {
      perform(
        name: 'Test User',
        email: 'email@example.com',
        password: 'password' # Missing password confirmation
      )
    }
    assert_equal user_count, User.all.count # Count is not changed - new user is not created
  end

  test 'create new user during registration with mismatched password will return an error' do
    user_count = User.all.count
    assert_raises(GraphQL::ExecutionError) {
      perform(
        name: 'Test User',
        email: 'email@example.com',
        password: 'password',
        password_confirmation: 'different'
      )
    }
    assert_equal user_count, User.all.count # Count is not changed - new user is not created
  end
end