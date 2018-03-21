require 'application_system_test_case'

class NewUserRegistrationTest < ApplicationSystemTestCase
  test "Brand new user can register and is directed to the home page" do
    visit root_path
    assert_text "Log-in to your account"
    click_on("Sign Up")
    assert_text "Register for KO Pool"
    fill_in "Name", with: "Jack Smith"
    fill_in "Email", with: "jack@example.com"
    fill_in "Password", with: "new_password"
    fill_in "Confirm password", with: "new_password"
    click_on("Register")
    assert_text "Welcome to KO Pool 2018!"
  end
end