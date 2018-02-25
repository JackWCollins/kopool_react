import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authService } from './AuthService'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    shouldRedirect: false,
    error: null
  };

  onLoginClick = () => {
    this.signInUser()
  };

  signInUser = async() => {
    this.setState({error: null});
    await this.props.signInUserMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((result) => {
      const token = result.data.signInUser.token;
      authService.saveUserData(token);
      this.setState({shouldRedirect: true})
    }).catch((e) => {
      this.setState({error: e.graphQLErrors[0]['message']})
    });
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to="/" />
      );
    } else {
      return (
        <div className='login-form'>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='' />
                {' '}Log-in to your account
              </Header>
              <Form size='large'>
                <Message negative hidden={this.state.error === null}>{this.state.error}</Message>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />

                  <Button color='teal' fluid size='large' onClick={this.onLoginClick}>Login</Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to='/register'>Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

// LoginForm.propTypes = {
//   onLoginSubmit: PropTypes.func.isRequired
// }

const SIGN_IN_USER_MUTATION = gql`
  mutation SignInUserMutation($email: String!, $password: String!){
    signInUser(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

export default graphql(SIGN_IN_USER_MUTATION, {name: 'signInUserMutation'})(LoginForm)
