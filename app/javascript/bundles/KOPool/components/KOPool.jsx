import PropTypes from 'prop-types';
import React from 'react';
import { Container, Header, Dropdown, Grid, List, Loader, Segment } from 'semantic-ui-react'
import { Home } from './Home'
import { Route, Link } from 'react-router-dom'
import { NavBar } from "./NavBar";
import { UserProfile } from "./UserProfile";
import { Sidebar } from "./Sidebar"
import { WeekSummary } from "./WeekSummary"
import { WeekTeamSummary } from "./WeekTeamSummary"
import UserWeekPicks from "./UserWeekPicks";
import { NewUserPick } from "./NewUserPick";

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import EditPoolEntry from "./EditPoolEntry";
import NewPoolEntry from "./NewPoolEntry";
import {WEB_STATE_QUERY} from "../queries/kopool-queries";

const NFL_TEAMS_QUERY = gql`
  query NflTeamsQuery {
    nflTeams {
      id
      name
    }
  }
`;

class KOPool extends React.Component {
  static propTypes = {
    season: PropTypes.string
  };

  componentDidMount() {

  };

  render() {
    // const nflTeams = this.props.nflTeamsQuery.nfl_teams;
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
          <NavBar></NavBar>
          <Container style={{ marginTop: '7em' }}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Sidebar />
                </Grid.Column>
                <Grid.Column width={14}>
                  <Container text>
                    <Route path="/" exact render={()=><Home broadcastMessage={this.props.webStateQuery.webState.broadcast_message} openForRegistration={this.props.webStateQuery.webState.season.open_for_registration} />} />
                    <Route path="/profile" exact component={UserProfile} />

                    {/* If there is no week_id param, use the current week */}
                    <Route path="/my_picks" exact render={() => <UserWeekPicks currentWeekId={this.props.webStateQuery.webState.week.id} /> } />
                    <Route path="/my_picks/:week_id" component={UserWeekPicks} />

                    <Route path="/week_summary" exact component={WeekSummary} />
                    <Route path="/week_summary/:team_id" component={WeekTeamSummary} />
                    <Route path="/picks/new" component={NewUserPick} />
                    <Route path="/pool_entries/new" component={NewPoolEntry} />
                    <Route path="/pool_entries/:pool_entry_id/edit" component={EditPoolEntry} />
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <Segment
            inverted
            vertical
            style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          >
            <Container textAlign='center'>
              <List horizontal inverted divided link>
                <List.Item as='a' href='#'>Contact Us</List.Item>
                <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              </List>
            </Container>
          </Segment>
        </div>
      );
    }
  }
}

export default graphql(WEB_STATE_QUERY, {name: 'webStateQuery'}) (KOPool)