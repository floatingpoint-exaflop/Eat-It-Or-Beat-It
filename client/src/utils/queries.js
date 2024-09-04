import { gql } from '@apollo/client';

export const QUERY_RECIPES = gql`
  query recipes {
    recipes {
      _id
      name
    }
  }
`;

export const QUERY_USERS = gql`
  query users($_id: String) {
    users(_id: $_id) {
      _id
      sdfsdfa
      sdafsdfa
      adsf
      asdf
    }
  }
`;
