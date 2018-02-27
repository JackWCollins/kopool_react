import React from 'react'
import { Card, Loader, Header, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class UserPoolEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.poolEntries.loading) {
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
          {this.props.poolEntries.userPoolEntries.map((pe) => (
            <Card fluid key={pe.id}>
              <Image src='' />
              <Card.Content>
                <Card.Header>
                  {pe.team_name}
                  <Link to={"/pool_entries/"+pe.id+"/edit"}>
                    <Icon name='edit'></Icon>
                  </Link>
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
          {this.props.poolEntries.userPoolEntries.map((pe) => (
            <Card fluid >
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

const USER_POOL_ENTRIES_QUERY = gql`
  query UserPoolEntriesQuery {
    userPoolEntries {
      id
      team_name
    }
  }
`;

export default graphql(USER_POOL_ENTRIES_QUERY, {name: 'poolEntries'})(UserPoolEntries)
