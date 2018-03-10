import React from 'react'
import { Card, Loader, Header, Image, List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MatchupOutcome from './MatchupOutcome'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { USER_WEEK_PICKS_QUERY } from "../queries/kopool-queries";
import Moment from 'react-moment';
import 'moment-timezone'

class UserWeekPicks extends React.Component {
  constructor(props) {
    super(props);
  }

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
    if (this.props.userWeekPicks.loading) {
      return (
        <div>
          <Header as='h1'>My picks this week</Header>
          <Loader active inline='centered' />
        </div>
      )
    } else {
      const unpicked = this.props.userWeekPicks.userPoolEntries.filter((pe) => typeof(pe.week_pick.id) === 'undefined').map((pe) => (
        <Link key={pe.id} to='/picks/new'>
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
      const picked = this.props.userWeekPicks.userPoolEntries.filter((pe) => typeof(pe.week_pick.id) != 'undefined').map((pe) => (
        <Card fluid key={pe.id}>
          <Image src='' />
          <Card.Content>
            <Card.Header>
              {pe.week_pick.nfl_team.name}
            </Card.Header>
            <Card.Meta>
            <span className='date'>
              {pe.name}
            </span>
            </Card.Meta>
            <Card.Description>
              <Moment format="MMMM Do YYYY, h:mm A z" tz="America/New_York">{pe.week_pick.matchup.game_time}</Moment> - {pe.week_pick.matchup.stadium}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {pe.week_pick.matchup.pickCount} picks this week
            </a>
          </Card.Content>
          <Card.Content extra className={pe.week_pick.status}>
            {this.outcomeText(pe.week_pick.status)}
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
}

export default graphql(USER_WEEK_PICKS_QUERY, {
  name: 'userWeekPicks',
  options: (ownProps) => ({
    variables: {
      week_id: typeof ownProps.currentWeekId === 'undefined' ? ownProps.match.params.week_id : ownProps.currentWeekId
    }
  })
})
(UserWeekPicks)
