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

export const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($pageNum: Int!) {
    seeCoffeeShops(pageNum: $pageNum) {
      result
      error
      shops {
        id
        name
        latitude
        longitude
        photos {
          id
          url
        }
        categories {
          id
          name
          slug
        }
      }
    }
  }
`;

export const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $photos: [Upload]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
    ) {
      result
      error
    }
  }
`;
