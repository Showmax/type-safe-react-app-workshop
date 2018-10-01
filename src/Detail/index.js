import React from 'react';


const Detail = ({ match }) => {
  return (
    <div>
      Detail Page (id: {match.params.id})
    </div>
  );
};


export default Detail;
