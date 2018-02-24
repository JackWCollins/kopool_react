import React from 'react'
import { List, Grid, Search, Button, Image, Divider, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { WeekMatchup } from "./WeekMatchup";

export class NewUserPick extends React.Component {
  constructor(props) {
    super(props);
    console.log("NewUserPick props: ", props);
  }

  state = {
    matchups: [
      {
        id: 'm1',
        game_time: 'Sunday, October 14th, 12 PM',
        stadium: 'Mile-Hi Stadium in Denver, CO',
        home_team: {
          id: 't4',
          name: 'Denver Broncos'
        },
        away_team: {
          id: 't1',
          name: 'Minnesota Vikings'
        }
      },
      {
        id: 'm2',
        game_time: 'Sunday, October 14th, 3 PM',
        stadium: 'Raiders Stadium in Oakland, CA',
        home_team: {
          id: 't5',
          name: 'Oakland Raiders'
        },
        away_team: {
          id: 't2',
          name: 'Atlanta Falcons'
        }
      },
      {
        id: 'm3',
        game_time: 'Sunday, October 14th, 3 PM',
        stadium: 'Minnesota Stadium in Minneapolis, MN',
        home_team: {
          id: 't6',
          name: 'Los Angeles Rams'
        },
        away_team: {
          id: 't3',
          name: 'Dallas Cowboys'
        }
      }
    ]
  };

  render() {
    const matchups = this.state.matchups.map((matchup) => (
       <WeekMatchup matchup={matchup} key={matchup.id} />
    ));

    return (
      <div>
        <Container fluid className='search-container'>
          <Search/>
        </Container>
        <Grid divided='vertically' className='week-matchups'>
          {matchups}
        </Grid>
      </div>
    )
  }
}
