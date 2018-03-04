import React from 'react'
import { List, Grid, Transition, Button, Header, Icon, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { graphql } from "react-apollo/index";
import gql from 'graphql-tag'
import { CREATE_PICK_MUTATION } from "../queries/kopool-queries";

class WeekMatchup extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    shouldRedirect: false
  }

  handleTeamPick = async(teamId) => {
    const result = await this.props.createPickMutation({
      variables: {
        nfl_team_id: 4,
        pool_entry_id: 1,
        week_id: 8,
        matchup_id: 2
      }
    })
    this.setState({shouldRedirect: true})
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to='/week_picks' />
      )
    } else {
      return (
        <Grid.Row columns={3} className='week-matchup-row'>
          <Grid.Column textAlign='left'>
            <Header>{this.props.matchup.home_team.name}</Header>
            <Container className='placeholder'>Home team</Container>
            <Button basic color='green' onClick={() => this.handleTeamPick(this.props.matchup.home_team.id)}>Pick {this.props.matchup.home_team.name}</Button>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Container>{this.props.matchup.game_time}</Container>
            <Container className='placeholder'>{this.props.matchup.stadium}</Container>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Header>{this.props.matchup.away_team.name}</Header>
            <Container className='placeholder'>Away team</Container>
            <Button basic color='green' onClick={() => this.handleTeamPick(this.props.matchup.away_team.id)}>Pick {this.props.matchup.away_team.name}</Button>
          </Grid.Column>
        </Grid.Row>
      )
    }
  }
}



export default graphql(CREATE_PICK_MUTATION, {name: 'createPickMutation'})(WeekMatchup)
