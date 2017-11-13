
'use strict';

import gql from 'graphql-tag';

export const addUser = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      _id
      name
    }
  }`;

export const Users = gql`
  query {
    users{
      _id
      name
    }
  }`;

export const removeUser = gql`
  mutation removeUser($ID: Int!) {
    removeUser(_id: $ID) {
      _id
    }
  }`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(_id: $id, name: $name) {
      _id
      name
    }
  }`;