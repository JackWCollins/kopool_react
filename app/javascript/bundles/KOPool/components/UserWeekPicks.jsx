import React from 'react'
import { Card, Container, Statistic, Grid, Header, Image, List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MatchupOutcome from './MatchupOutcome'

export class UserWeekPicks extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    poolEntries: [
      {
        id: 'p1',
        name: 'Start Collins Me a Winner',
        pick: {
          id: 'pick1',
          outcome: 'won',
          nflTeam: {
            id: 't1',
            name: 'Minnesota Vikings',
          },
          matchup: {
            id: 'm1',
            game_time: 'Sunday, October 14th, 12 PM',
            stadium: 'Mile-Hi Stadium in Denver, CO',
            winning_team_id: 't1',
            pickCount: 35
          },
        }
      },
      {
        id: 'p2',
        name: 'Denver Represent',
        pick: {
          id: 'pick2',
          outcome: 'pending',
          nflTeam: {
            id: 't2',
            name: 'Atlanta Falcons',
          },
          matchup: {
            id: 'm2',
            game_time: 'Sunday, October 14th, 3 PM',
            stadium: 'Raiders Stadium in Oakland, CA',
            winning_team_id: 't43',
            pickCount: 25
          },
        }
      },
      {
        id: 'p3',
        name: 'My Cat Picked This Team',
        pick: {
          id: 'pick3',
          outcome: 'lost',
          nflTeam: {
            id: 't3',
            name: 'Dallas Cowboys',
          },
          matchup: {
            id: 'm3',
            game_time: 'Sunday, October 14th, 3 PM',
            stadium: 'Minnesota Stadium in Minneapolis, MN',
            winning_team_id: null,
            pickCount: 12
          },
        }
      },
      {
        id: 'p4',
        name: 'Snowboarding FTW',
        pick: {}
      }
    ]
  };

  outcomeText = (outcome) => {
    if (outcome == 'won') {
      return 'Won'
    } else if (outcome == 'lost') {
      return "KO'd"
    } else {
      return "In play"
    }
  }

  render() {
    const unpicked = this.state.poolEntries.filter((pe) => typeof(pe.pick.id) === 'undefined').map((pe) => (
      <Link key={pe.id} to='/new_pick'>
        <Card fluid >
          <Image src='' />
          <Card.Content>
            <Card.Header>
              {pe.name}
            </Card.Header>
            <Card.Description>
              Click here to make a pick for this pool entry!
            </Card.Description>
          </Card.Content>
          <Card.Content extra className="needs-pick">
            Needs a Pick!
          </Card.Content>
        </Card>
      </Link>
    ));
    const picked = this.state.poolEntries.filter((pe) => typeof(pe.pick.id) != 'undefined').map((pe) => (
      <Card fluid key={pe.id}>
        <Image src='' />
        <Card.Content>
          <Card.Header>
            {pe.pick.nflTeam.name}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {pe.name}
            </span>
          </Card.Meta>
          <Card.Description>
            {pe.pick.matchup.game_time} - {pe.pick.matchup.stadium}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {pe.pick.matchup.pickCount} picks this week
          </a>
        </Card.Content>
        <Card.Content extra className={pe.pick.outcome}>
          {this.outcomeText(pe.pick.outcome)}
        </Card.Content>
      </Card>
    ));

    if (unpicked.length > 0) {
      return (
        <div>
          <Header as='h1'>My picks this week</Header>
          <Header as='h4'>Still needs a pick:</Header>
          {unpicked}
          <Header as='h4'>Saved:</Header>
          {picked}
        </div>
      )
    } else {
      return (
        <div>
          <Header as='h1'>My picks this week</Header>
          {unpicked}
          {picked}
        </div>
      )
    }
  }
}
