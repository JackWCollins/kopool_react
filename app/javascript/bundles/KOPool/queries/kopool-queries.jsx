import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo'

// Main Web State
export const WEB_STATE_QUERY = gql`
  query WebStateQuery {
    webState {
      id
      broadcast_message
      week {
        id
        week_number
      }
      season {
        id
        year
        open_for_registration
      }
    }
  }
`;

// Pool entries

export const USER_POOL_ENTRIES_QUERY = gql`
  query UserPoolEntriesQuery {
    userPoolEntries {
      id
      team_name
    }
  }
`;

export const UPDATE_POOL_ENTRY_MUTATION = gql`
  mutation UpdatePoolEntryMutation($team_name: String!, $id: ID!){
    updatePoolEntry(id: $id, team_name: $team_name) {
      id
      team_name
    }
  }
`

export const POOL_ENTRY_QUERY= gql`
  query PoolEntryQuery($id: ID!){
    poolEntry(id: $id) {
      id
      team_name
    }
  }
`

export const DELETE_POOL_ENTRY_MUTATION = gql`
  mutation DeletePoolEntryMutation($id: ID!){
    deletePoolEntry(id: $id) {
      id
    }
  }
`

// Picks

export const CREATE_PICK_MUTATION = gql`
  mutation CreatePickMutation($nfl_team_id: Int!, $week_id: Int!, $pool_entry_id: Int!, $matchup_id: Int!){
    createPick(nfl_team_id: $nfl_team_id, week_id: $week_id, pool_entry_id: $pool_entry_id, matchup_id: $matchup_id) {
      id
      nfl_team {
        id
        name
      }
      matchup {
        id
        game_time
      }
    }
  }
`
