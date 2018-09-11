

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilmDetailData
// ====================================================

export type FilmDetailData_film_characterConnection_characters = {|
  /**
   * The name of this person.
   */
  +name: ?string
|};

export type FilmDetailData_film_characterConnection = {|
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  +characters: ?$ReadOnlyArray<?FilmDetailData_film_characterConnection_characters>
|};

export type FilmDetailData_film_planetConnection_planets = {|
  /**
   * The name of this planet.
   */
  +name: ?string
|};

export type FilmDetailData_film_planetConnection = {|
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  +planets: ?$ReadOnlyArray<?FilmDetailData_film_planetConnection_planets>
|};

export type FilmDetailData_film = {|
  /**
   * The episode number of this film.
   */
  +episodeID: ?number,
  /**
   * The title of this film.
   */
  +title: ?string,
  /**
   * The ISO 8601 date format of film release at original creator country.
   */
  +releaseDate: ?string,
  /**
   * The name of the director of this film.
   */
  +director: ?string,
  /**
   * The opening paragraphs at the beginning of this film.
   */
  +openingCrawl: ?string,
  +characterConnection: ?FilmDetailData_film_characterConnection,
  +planetConnection: ?FilmDetailData_film_planetConnection,
|};

export type FilmDetailData = {|
  +film: ?FilmDetailData_film
|};

export type FilmDetailDataVariables = {|
  +id: string
|};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================