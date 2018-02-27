import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authService } from './AuthService'
import PoolEntryForm from './PoolEntryForm'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class EditPoolEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    team_name: '',
    shouldRedirect: false,
    error: null,
    pool_entry_id: null
  };

  updatePoolEntry = async(teamName) => {
    this.setState({error: null});
    await this.props.updatePoolEntryMutation({
      variables: {
        id: this.props.poolEntryQuery.poolEntry.id,
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
    } else if (this.props.poolEntryQuery.loading) {
      return (
        <Loader active/>
      )
    } else {
      return (
        <PoolEntryForm teamName={this.props.poolEntryQuery.poolEntry.team_name} onSubmit={this.updatePoolEntry} error={this.state.error}/>
      )
    }
  }
}

const UPDATE_POOL_ENTRY_MUTATION = gql`
  mutation UpdatePoolEntryMutation($team_name: String!, $id: ID!){
    updatePoolEntry(id: $id, team_name: $team_name) {
      id
      team_name
    }
  }
`

const POOL_ENTRY_QUERY= gql`
  query PoolEntryQuery($id: ID!){
    poolEntry(id: $id) {
      id
      team_name
    }
  }
`

export default compose(
  graphql(UPDATE_POOL_ENTRY_MUTATION, {name: 'updatePoolEntryMutation'}),
  graphql(POOL_ENTRY_QUERY, {
    name: 'poolEntryQuery',
    options: (ownProps) => ({
      variables: {
        id: ownProps.match.params.pool_entry_id
      }
    })})
)(EditPoolEntry)
