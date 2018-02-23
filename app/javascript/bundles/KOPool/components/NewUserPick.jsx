import React from 'react'
import { Card, Grid, Search, Button, Image, Divider, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
      <Grid divided='vertically' key={matchup.id}>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Image />
                <Card.Header>
                  {matchup.home_team.name}
                </Card.Header>
                <Card.Meta>
                  Home team
                </Card.Meta>
              </Card.Content>
              <Card.Content textAlign='center'>
                <div>
                  <Button basic color='green'>Pick {matchup.home_team.name}</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            AT
            <Divider></Divider>
            <div className='placeholder italics'>
              {matchup.game_time}
            </div>
            <div className='placeholder italics'>
              {matchup.stadium}
            </div>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Image />
                <Card.Header>
                  {matchup.away_team.name}
                </Card.Header>
                <Card.Meta>
                  Away team
                </Card.Meta>
              </Card.Content>
              <Card.Content textAlign='center'>
                <div>
                  <Button basic color='green'>Pick {matchup.away_team.name}</Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    ));

    return (
      <div>
        <Container>
          <Search
            // loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={this.handleSearchChange}
            // results={results}
            // value={value}
            {...this.props}
          />
        </Container>

        {matchups}
      </div>
    )
  }
}
