import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authService } from './AuthService'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class PoolEntryForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("Pool Entry form props: ", this.props)
  }

  state = {
    team_name: '',
  };

  componentDidMount() {
    console.log("Component did mount with props: ", this.props)
    if (this.props.teamName) {
      this.setState({team_name: this.props.teamName})
    }
  }

  handleSubmitClick = () => {
    console.log("form submit click with state: ", this.state);
    this.props.onSubmit(this.state.team_name);
  }

  render() {
    return (
      <div>
        <Header>Add a new pool Entry</Header>
        <Form>
          <Message negative hidden={this.props.error === null}>{this.props.error}</Message>
          <Form.Input
            label="Team name"
            placeholder="Don't call it a comeback"
            value={this.state.team_name}
            onChange={e => this.setState({team_name: e.target.value})}
          />
          <Button type='submit' positive onClick={() => this.handleSubmitClick()}>Save</Button>
        </Form>
      </div>
    )
  }
}

export default PoolEntryForm
