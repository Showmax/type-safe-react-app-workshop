// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import Cookie from 'js-cookie';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import type { 
  UserFavoritesData as UserFavoritesDataType,
  UserFavoritesDataVariables
 } from './__generated__/UserFavoritesData';
import type { 
  AddToFavoritesMutation as AddToFavoritesMutationType,
  AddToFavoritesMutationVariables
 } from './__generated__/AddToFavoritesMutation';
import type { 
  RemoveFromFavoritesMutation as RemoveFromFavoritesMutationType,
  RemoveFromFavoritesMutationVariables
 } from './__generated__/RemoveFromFavoritesMutation';

class UserFavoritesQuery extends Query<UserFavoritesDataType, UserFavoritesDataVariables> {};
class AddToFavoritesMutation extends Mutation<AddToFavoritesMutationType, AddToFavoritesMutationVariables> {};
class RemoveFromFavoritesMutation extends Mutation<RemoveFromFavoritesMutationType, RemoveFromFavoritesMutationVariables> {};


const userFavoritesQuery = gql`
  query UserFavoritesData($userId: ID!) {
    favorites(userId: $userId) {
      id
      films
    }
  }
`;

const addToFavoritesMutation = gql`
  mutation AddToFavoritesMutation($userId: ID!, $filmId: ID!) {
    addToFavorites(userId: $userId, filmId: $filmId) {
      id
      films
    }
  }
`;

const removeFromFavoritesMutation = gql`
  mutation RemoveFromFavoritesMutation($userId: ID!, $filmId: ID!) {
    removeFromFavorites(userId: $userId, filmId: $filmId) {
      id
      films
    }
  }
`;

type ResultLoading = {|
  loading: true,
  addToFavorites: (filmId: string) => Promise<mixed>,
  removeFromFavorites: (filmId: string) => Promise<mixed>,
|};

type ResultFailure = {|
  failure: true,
  error: string,
  addToFavorites: (filmId: string) => Promise<mixed>,
  removeFromFavorites: (filmId: string) => Promise<mixed>,
|};

type ResultSuccess = {|
  success: true,
  favoriteFilms: Array<string>,
  addToFavorites: (filmId: string) => Promise<mixed>,
  removeFromFavorites: (filmId: string) => Promise<mixed>,
|};


type Props = {|
  children: (ResultLoading | ResultFailure | ResultSuccess) => Node,
|};

type State = {|
  userId: string,
|};

class UserFavoritesData extends Component<Props, State> {
  static getUserId = (): string => {
    let userId = Cookie.get('sw_user_id');
    if (!userId) {
      userId = uuid();
      Cookie.set('sw_user_id', userId);
    }
    return userId;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      userId: UserFavoritesData.getUserId(),
    };
  }

  render() {
    const { userId } = this.state;
    const { children } = this.props;
    return (
      <AddToFavoritesMutation mutation={addToFavoritesMutation}>
        {(addToFavoritesMutate) => (
          <RemoveFromFavoritesMutation mutation={removeFromFavoritesMutation}>
            {(removeFromFavoritesMutate) => (
              <UserFavoritesQuery
                query={userFavoritesQuery}
                variables={{ userId }}
              >
                {(queryResult) => {
                  const addToFavorites = (filmId: string) => addToFavoritesMutate({ variables: { userId, filmId } });
                  const removeFromFavorites = (filmId: string) => removeFromFavoritesMutate({ variables: { userId, filmId } });

                  const { loading, error, data } = queryResult;

                  if (loading) return children({ loading: true, addToFavorites, removeFromFavorites });
                  if (error) return children({ failure: true, error: error.message, addToFavorites, removeFromFavorites });

                  if (!data || !data.favorites || !data.favorites.films) {
                    return children({ failure: true, error: 'Unexpected query result', addToFavorites, removeFromFavorites })
                  }

                  return children({ success: true, favoriteFilms: data.favorites.films, addToFavorites, removeFromFavorites})          
                }}
              </UserFavoritesQuery>
            )}
        </RemoveFromFavoritesMutation>
        )}
      </AddToFavoritesMutation>
    );
  }
}


export default UserFavoritesData;