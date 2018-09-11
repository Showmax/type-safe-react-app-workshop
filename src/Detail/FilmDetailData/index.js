// @flow
import React from 'react';
import type { Node } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import type {
  FilmDetailData as FilmDetailDataType,
  FilmDetailDataVariables,
  FilmDetailData_film as Film,
 } from './__generated__/FilmDetailData';


class FilmDetailQuery extends Query<FilmDetailDataType, FilmDetailDataVariables> {};

const filmDetailDataQuery = gql`
  query FilmDetailData($id: ID!) {
    film(id: $id) {
      episodeID
      title
      releaseDate
      director
      openingCrawl
      characterConnection {
        characters {
          name
        }
      }
      planetConnection {
        planets {
          name
        }
      }
    }
  }
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
  film: Film,
|};

type Props = {|
  id: string,
  children: (ResultLoading | ResultFailure | ResultSuccess) => Node,
|};

const FilmDetailData = ({ children, id }: Props) => (
  <FilmDetailQuery query={filmDetailDataQuery} variables={{ id }}>
    {(queryResult) => {
      const { loading, error, data } = queryResult;

      if (loading) return children({ loading: true });

      if (error) return children({ failure: true, error: error.message });

      if (!data || !data.film) {
        return children({ failure: true, error: 'Unexpected query result' });
      }

      return children({ success: true, film: data.film });
    }}
  </FilmDetailQuery>
);

export default FilmDetailData;
