const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    size: String
    color: String
    condition: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type File {
    filename: String!
  }
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    upload(file: Upload!): File!
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addProduct(
      name: String!
      description: String!
      size: String!
      color: String!
      price: Float!
      quantity: Int!
      condition: String!
      image: String
      category: String!
    ): Product
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    uploadImage(filename: String!): String!
  }
`;

module.exports = typeDefs;
