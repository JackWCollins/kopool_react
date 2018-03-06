import React from 'react'
import { Header, Loader, Container, Message, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { NavBar } from "./NavBar";
import UserPoolEntries from "./UserPoolEntries"
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { WEB_STATE_QUERY } from "../queries/kopool-queries";

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as='h1'>Welcome to KO Pool 2018!</Header>
        <Container className='broadcast-message-container'>
          <Message info>
            <Message.Header>From the office of the commish:</Message.Header>
            <p>{this.props.broadcastMessage}</p>
          </Message>
        </Container>
        <Container className='season-summary'>
          <Statistic.Group widths="two">
            <Statistic color='green'>
              <Statistic.Value>$20,500</Statistic.Value>
              <Statistic.Label>Payout</Statistic.Label>
            </Statistic>
            <Statistic color='red'>
              <Statistic.Value>257</Statistic.Value>
              <Statistic.Label>Remaining</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Container>
        <UserPoolEntries openForRegistration={this.props.openForRegistration}/>
      </div>
    )
  }
}

