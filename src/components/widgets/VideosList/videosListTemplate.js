import React from 'react';
import { Link } from 'react-router-dom';

import './videosList.css';
import CardInfo from '../CardInfo/cardInfo';

const VideosListTemplate = ({ data, teams }) => {
  return data.map((item, i) => {
    return (
      <Link key={i} to={`/videos/${item.id}`}>
        <div className="videoListItem_wrapper">
          <div className="left" style={{ background: `url(../images/videos/${item.image})` }}>
            <div />
          </div>
          <div className="right">
            <CardInfo teams={teams} teamId={item.team} date={item.date} />
            <h2>{item.title}</h2>
          </div>
        </div>
      </Link>
    );
  });
};

export default VideosListTemplate;
