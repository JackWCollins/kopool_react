class AuthToken
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.token(user)
    payload = {user_id: user.id}
    JWT.encode(payload, key, 'HS256')
  end

  def self.verify(token)
    decoded_token = JWT.decode(token, key, true, {algorithm: 'HS256'})
    User.find_by(id: decoded_token[0]['user_id'])
  end
end