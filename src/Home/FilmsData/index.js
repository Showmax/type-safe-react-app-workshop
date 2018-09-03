// @flow
import React from 'react';
import type { Node } from 'react';
import { Query } from 'react-apollo';
import type { ApolloError } from 'react-apollo';
import gql from 'graphql-tag';

import { HomePageFilmFragment } from '../Film';
import type { 
  FilmsData as FilmsDataType,
  FilmsData_allFilms_films as Film,
 } from './__generated__/FilmsData';


class FilmsQuery extends Query<FilmsDataType, {}> {};

const filmsDataQuery = gql`
  query FilmsData {
    allFilms {
      films {
        ...HomePageFilm
      }
    }
  }

  ${HomePageFilmFragment}
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
  films: Array<Film>,
|};

type Props = {|
  children: (ResultLoading | ResultFailure | ResultSuccess) => Node,
|};

const FilmsData = (props: Props) => (
  <FilmsQuery query={filmsDataQuery}>
    {(queryResult) => {
      const { loading, error, data } = queryResult;

      if (loading) return props.children({ loading: true });

      if (error) return props.children({ failure: true, error: error.message });

      if (!data || !data.allFilms || !data.allFilms.films) {
        return props.children({ failure: true, error: 'Unexpected query result' });
      }

      // filter out possible "null" films
      const films = data.allFilms.films.filter(Boolean)

      return props.children({ success: true, films });
    }}
  </FilmsQuery>
);

export default FilmsData;