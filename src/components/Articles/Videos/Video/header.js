import React from 'react';
import TeamNfo from '../../Elements/teamNfo';

const VideoHeader = props => {
  const teamNfo = team => {
    return team ? <TeamNfo team={team} /> : null;
  };

  return <div>{teamNfo(props.teamData)}</div>;
};

export default VideoHeader;
