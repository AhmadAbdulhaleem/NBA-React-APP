import React from 'react';
import VideosListTemplate from '../videosListTemplate';

const VideosRelated = ({ data, teams }) => {
  return (
    <div className="relatedWrapper">
      <VideosListTemplate data={data} teams={teams} />
    </div>
  );
};

export default VideosRelated;
