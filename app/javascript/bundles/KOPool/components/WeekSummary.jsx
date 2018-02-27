import React from 'react'
import { Container, Statistic, Grid, Header, Image, List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MatchupOutcome from './MatchupOutcome'

export class WeekSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    nflTeams: [
      {
        id: 't1',
        name: 'Minnesota Vikings',
        outcome: 'won',
        matchup: {
          id: 'm1',
          game_time: 'Sunday, October 14th, 12 PM',
          stadium: 'Mile-Hi Stadium in Denver, CO',
          winning_team_id: 't1',
        },
        pickCount: 35
      },
      {
        id: 't2',
        name: 'Atlanta Falcons',
        outcome: 'lost',
        matchup: {
          id: 'm2',
          game_time: 'Sunday, October 14th, 3 PM',
          stadium: 'Raiders Stadium in Oakland, CA',
          winning_team_id: 't43',
        },
        pickCount: 25
      },
      {
        id: 't3',
        name: 'Dallas Cowboys',
        outcome: 'pending',
        matchup: {
          id: 'm3',
          game_time: 'Sunday, October 14th, 3 PM',
          stadium: 'Minnesota Stadium in Minneapolis, MN',
          winning_team_id: null,
        },
        pickCount: 12
      }
    ]
  };

  render() {
    const nflTeamCards = this.state.nflTeams.map((nflTeam) => (
      <List.Item key={nflTeam.id}>
        <Link to={"/week_summary/"+nflTeam.id}>
          <List.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                  <List.Header>{nflTeam.name}</List.Header>
                  <List.Description>{nflTeam.pickCount} picks</List.Description>
                  <List.Description className='matchup-details'>
                    {nflTeam.matchup.game_time} - {nflTeam.matchup.stadium}
                  </List.Description>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='middle'>
                  <MatchupOutcome outcome={nflTeam.outcome} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </List.Content>
        </Link>
      </List.Item>
    ));
    return (
      <Container className='week-results'>
        <Header>Week 1 Results</Header>
        <Statistic.Group widths="three">
          <Statistic color='green'>
            <Statistic.Value>35</Statistic.Value>
            <Statistic.Label>Advanced</Statistic.Label>
          </Statistic>
          <Statistic color='red'>
            <Statistic.Value>25</Statistic.Value>
            <Statistic.Label>KO'd</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>12</Statistic.Value>
            <Statistic.Label>In play</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <List selection verticalAlign='middle' size='big'>
          {nflTeamCards}
        </List>
      </Container>
    )
  }
}
