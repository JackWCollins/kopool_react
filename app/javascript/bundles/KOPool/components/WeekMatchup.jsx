import React from 'react'
import { List, Grid, Transition, Button, Header, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export class WeekMatchup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTeamPick = (teamId) => {
    console.log("Picked: ", teamId);
  };

  render() {
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
