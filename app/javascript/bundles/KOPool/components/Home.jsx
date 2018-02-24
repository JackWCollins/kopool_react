import React from 'react'
import { Header, Loader, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { NavBar } from "./NavBar";
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const WEB_STATE_QUERY = gql`
  query WebStateQuery {
    webState {
      id
      broadcast_message
      week {
        id
        week_number
      }
      season {
        id
        year
        open_for_registration
      }
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("Home props: ", props);
  }

  render() {
    if (this.props.webStateQuery.loading) {
      return (
        <div>
          <Header as='h1'>Welcome to KO Pool 2018!</Header>
          <Loader active inline='centered' />
        </div>
      )
    } else {
      return (
        <div>
          <Header as='h1'>Welcome to KO Pool 2018!</Header>
          <Container>
            {this.props.webStateQuery.webState.broadcast_message}
          </Container>
        </div>
      )
    }
  }
}

export default graphql(WEB_STATE_QUERY, {name: 'webStateQuery'}) (Home)

