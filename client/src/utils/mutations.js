import { gql } from '@apollo/client';

export const CREATE_RECIPE = gql`
  mutation createRecipe($dfs: dfs!, $dfs: String!) {
    createRecipe(tech1: $dfs, sdf: $dsf) {
      _id
      sdf
      dfs
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($_id: String!, $dsf: Int!) {
    createUser(_id: $_id, dfs: $dsf) {
      _id
      sdf
      sdf
      dsf
      dfs
    }
  }
`;
