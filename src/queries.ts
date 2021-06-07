import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      result
      token
      error
    }
  }
`;

export const SIGN_UP = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
    $name: String
    $location: String
  ) {
    createAccount(
      email: $email
      username: $username
      password: $password
      name: $name
      location: $location
    ) {
      result
      error
    }
  }
`;
