import React from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { authService } from './AuthService'

export class Sidebar extends React.Component {

  render() {
    const weeks = [
      {id: 'w1', week_number: 1},
      {id: 'w2', week_number: 2},
      {id: 'w3', week_number: 3},
      {id: 'w4', week_number: 4},
      {id: 'w5', week_number: 5},
      {id: 'w6', week_number: 6},
      {id: 'w7', week_number: 7},
      {id: 'w8', week_number: 8},
      {id: 'w9', week_number: 9},
      {id: 'w10', week_number: 10},
      {id: 'w11', week_number: 11},
      {id: 'w12', week_number: 12},
      {id: 'w13', week_number: 13},
      {id: 'w14', week_number: 14},
      {id: 'w15', week_number: 15},
      {id: 'w16', week_number: 16},
      {id: 'w17', week_number: 17},
    ];

    const weekLinks = weeks.map((week) => (
      <List.Item key={week.id}>
        <List.Content>
          <List.Header><Link to={"/"+week.id}>Week {week.week_number}</Link></List.Header>
        </List.Content>
      </List.Item>
    ))

    return (
      <Container>
        <List selection verticalAlign='middle'>
          <Header as="h5">This week</Header>
          <List.Item>
            <List.Content>
              <List.Header><Link to="/my_picks">My Picks</Link></List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header><Link to="/week_summary">Week Summary</Link></List.Header>
            </List.Content>
          </List.Item>
          <Divider />
          <Header as="h5">All weeks</Header>
          {weekLinks}
        </List>

      </Container>
    )
  }
}

