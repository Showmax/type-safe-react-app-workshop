// @flow
import React from 'react';
import type { Match } from 'react-router-dom';


type Props = {
  match: Match,
};

const Detail = ({ match }: Props) => {
  return (
    <div>
      Detail Page (id: {match.params.id})
    </div>
  );
};


export default Detail;
