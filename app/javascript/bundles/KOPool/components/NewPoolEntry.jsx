import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authService } from './AuthService'
import PoolEntryForm from './PoolEntryForm'

import { graphql} from 'react-apollo'
import gql from 'graphql-tag'

class NewPoolEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    team_name: '',
    shouldRedirect: false,
    error: null,
    pool_entry_id: null
  };

  // componentDidMount() {
  //   if (this.props.match.params) {
  //     this.setState({pool_entry_id: this.props.match.params.pool_entry_id})
  //   }
  // }

  // onSubmit = () => {
  //   this.createPoolEntry()
  // };

  createPoolEntry = async(teamName) => {
    this.setState({error: null});
    await this.props.createPoolEntryMutation({
      variables: {
        team_name: teamName
      }
    }).then((response) => {
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
        <PoolEntryForm onSubmit={this.createPoolEntry} error={this.state.error} teamName=''/>
      )
    }
  }
}

// LoginForm.propTypes = {
//   onLoginSubmit: PropTypes.func.isRequired
// }

const CREATE_POOL_ENTRY_MUTATION = gql`
  mutation CreatePoolEntryMutation($team_name: String!){
    createPoolEntry(team_name: $team_name) {
      id
      team_name
    }
  }
`

export default graphql(CREATE_POOL_ENTRY_MUTATION, {name: 'createPoolEntryMutation'})(NewPoolEntry)
