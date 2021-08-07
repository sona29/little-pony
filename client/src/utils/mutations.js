import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $size: String!
    $color: String!
    $price: Float!
    $quantity: Int!
    $condition: String!
    $image: String
    $category: String!
  ) {
    addProduct(
      name: $name
      description: $description
      size: $size
      color: $color
      price: $price
      quantity: $quantity
      condition: $condition
      image: $image
      category: $category
    ) {
      
        _id
        name
        description
        size
        color
        condition
        image
        quantity
        price
        category{name}
      
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation upload($file: Upload!) {
    upload(file: $file) {
      filename
    }
  }
`;
