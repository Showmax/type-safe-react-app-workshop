

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FilmsData2
// ====================================================

export type FilmsData2_allFilms_films = {|
  /**
   * The ID of an object
   */
  +id: string,
  /**
   * The episode number of this film.
   */
  +episodeID: ?number,
  /**
   * The title of this film.
   */
  +title: ?string,
  +poster: ?string,
|};

export type FilmsData2_allFilms = {|
  /**
   * A list of all of the objects returned in the connection. This is a convenience
   * field provided for quickly exploring the API; rather than querying for
   * "{ edges { node } }" when no edge data is needed, this field can be be used
   * instead. Note that when clients like Relay need to fetch the "cursor" field on
   * the edge to enable efficient pagination, this shortcut cannot be used, and the
   * full "{ edges { node } }" version should be used instead.
   */
  +films: ?$ReadOnlyArray<?FilmsData2_allFilms_films>
|};

export type FilmsData2_favorites = {|
  +id: string,
  +films: $ReadOnlyArray<string>,
|};

export type FilmsData2 = {|
  +allFilms: ?FilmsData2_allFilms,
  +favorites: ?FilmsData2_favorites,
|};

export type FilmsData2Variables = {|
  +userId: string
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