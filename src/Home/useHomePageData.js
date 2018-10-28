// @flow
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import uuid from 'uuid';
import gql from 'graphql-tag';
import type { ApolloClient } from 'react-apollo';
import { FilmFragment } from './Film';
import type {
  FilmsData2_allFilms_films as Film,
} from './__generated__/FilmsData2';


function useUserId() {
  const [userId, setUserId] = useState(Cookies.get('sw_user_id'));

  useEffect(() => {
    if (!userId) {
      const newUserId = uuid();
      Cookies.set('sw_user_id', newUserId);
      setUserId(newUserId);
    }
  }, [userId]);

  return userId;
}

function useQuery(apolloClient: ApolloClient<{}>, options: { query: string, variables: {} }) {
  const { query, variables } = options;
  const [result, setResult] = useState({ loading: true, error: null, data: null });
  const queryObservableRef = useRef(null);
  const querySubscriptionRef = useRef(null);

  useEffect(() => {
    queryObservableRef.current = apolloClient.watchQuery({ query, variables });
    querySubscriptionRef.current = queryObservableRef.current.subscribe({
      next: ({ data }) => {
        setResult(queryObservableRef.current.currentResult());
      },
      error: error => {
        setResult(queryObservableRef.current.currentResult());
      }
    });

    return () => {
      queryObservableRef.current = null;
      querySubscriptionRef.current.unsubscribe();
    };
  }, [query]);

  return result;
}

const query = gql`
  query FilmsData2($userId: ID!) {
    allFilms {
      films {
        id
        ...FilmFragment
      }
    }
    favorites(userId: $userId) {
      id
      films
    }
  }
  ${FilmFragment}
`;

type ResultLoading = {|
  loading: true,
|};

type ResultFailure = {|
  failure: true,
  error: string,
|};

type ResultSuccess = {|
  success: true,
  films: $ReadOnlyArray<Film>,
  favoriteFilmIds: $ReadOnlyArray<string>,
|};

type Result = ResultLoading | ResultFailure | ResultSuccess;

export default function useHomePageData(apolloClient: ApolloClient<{}>): Result {
  const userId = useUserId();
  const { loading, error, data } = useQuery(apolloClient, { query, variables: { userId } });

  if (loading) {
    return { loading: true };
  }

  if (error) {
    return {
      failure: true,
      error: error.message,
    };
  }

  if (!data || !data.allFilms || !data.allFilms.films) {
    return {
      failure: true,
      error: 'useHomePageData: Unexpected result of the FilmsData query',
    };
  }

  const films = data.allFilms.films.filter(Boolean);
  const favoriteFilmIds = data.favorites ? data.favorites.films : [];

  return {
    success: true,
    films,
    favoriteFilmIds,
  };
}
