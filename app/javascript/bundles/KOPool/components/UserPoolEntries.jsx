import React from 'react'
import { Card, Loader, Header, Image, Button, Icon, Container, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { USER_POOL_ENTRIES_QUERY, DELETE_POOL_ENTRY_MUTATION } from '../queries/kopool-queries'

class UserPoolEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null
  };

  deletePoolEntry = async(poolEntryId) => {
    this.setState({error: null});
    await this.props.deletePoolEntryMutation({
      variables: {
        id: poolEntryId
      }
    }).then((response) => {
      this.setState({shouldRedirect: true})
    }).catch((e) => {
      this.setState({error: e.graphQLErrors[0]['message']})
    });
  };

  render() {
    if (this.props.poolEntriesQuery.loading) {
      return (
        <div>
          <Header as='h3'>My pool entries:</Header>
          <Loader active inline='centered' />
        </div>
      )
    } else if (this.props.openForRegistration) {
      return (
        <div>
          <Header as='h3'>My pool entries:</Header>
          {this.props.poolEntriesQuery.userPoolEntries.map((pe) => (
            <Card fluid key={pe.id}>
              <Image src='' />
              <Card.Content>
                <Card.Header>
                  {pe.team_name}
                  <span className='float-right'>
                    <Link to={"/pool_entries/"+pe.id+"/edit"}>
                      <Icon name='edit'></Icon>
                    </Link>
                    <Icon name='delete' onClick={() => this.deletePoolEntry(pe.id)}></Icon>
                  </span>
                </Card.Header>
                <Card.Description>
                  Click here to make a pick for this pool entry!
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="needs-pick">
                Needs a Pick!
              </Card.Content>
            </Card>
          ))}
          <Link to='pool_entries/new'>
            <Button positive>Add a new pool entry</Button>
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          <Header as='h3'>My pool entries:</Header>
          {this.props.poolEntriesQuery.userPoolEntries.map((pe) => (
            <Card fluid key={pe.id}>
              <Image src='' />
              <Card.Content>
                <Card.Header>
                  {pe.team_name}
                </Card.Header>
                <Card.Description>
                  Click here to make a pick for this pool entry!
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="needs-pick">
                Needs a Pick!
              </Card.Content>
            </Card>
          ))}
        </div>
      )
    }
  }
}

export default compose(
  graphql(USER_POOL_ENTRIES_QUERY, {name: 'poolEntriesQuery'}),
  graphql(DELETE_POOL_ENTRY_MUTATION,
    {
      name: 'deletePoolEntryMutation',
      options: {
        refetchQueries: [{query: USER_POOL_ENTRIES_QUERY}]
      }
    }),
)(UserPoolEntries)
