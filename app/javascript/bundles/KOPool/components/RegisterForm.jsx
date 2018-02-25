import React from 'react'
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { authService } from './AuthService'
import {graphql} from "react-apollo/index";
import gql from "graphql-tag";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    shouldRedirect: false,
    error: null
  };

  onRegisterClick = () => {
    this.createUser()
  }

  createUser = async() => {
    this.setState({error: null});
    await this.props.createUserMutation({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      }
    }).then((result) => {
      const token = result.data.createUser.token;
      authService.saveUserData(token);
      this.setState({shouldRedirect: true})
    }).catch((e) => {
      this.setState({error: e.graphQLErrors[0]['message']})
    })
  }

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <div className='register-form'>
          <Grid
            textAlign='center'
            style={{height: '100%'}}
            verticalAlign='middle'
          >
            <Grid.Column style={{maxWidth: 450}}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' />
                {' '}Register for KO Pool
              </Header>
              <Form size='large'>
                <Message negative hidden={this.state.error === null}>{this.state.error}</Message>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <Form.Input
                    fluid
                    icon='envelope'
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
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm password'
                    type='password'
                    value={this.state.password_confirmation}
                    onChange={e => this.setState({ password_confirmation: e.target.value })}
                  />

                  <Button color='teal' fluid size='large' onClick={this.onRegisterClick}>Register</Button>
                </Segment>
              </Form>
              <Message>
                Already have an account? <Link to='/login'>Login</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!, $password_confirmation: String!){
    createUser(name: $name, email: $email, password: $password, password_confirmation: $password_confirmation) {
      token
      user {
        id
        name
      }
    }
  }
`

export default graphql(CREATE_USER_MUTATION, {name: 'createUserMutation'})(RegisterForm)