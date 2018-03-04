import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authService } from './AuthService'
import PoolEntryForm from './PoolEntryForm'
import { UPDATE_POOL_ENTRY_MUTATION, POOL_ENTRY_QUERY } from "../queries/kopool-queries";

import { graphql, compose } from 'react-apollo'

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
