import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './cardInfo.css';

const CardInfo = ({ teams, teamId, date }) => {
  const getTeamName = () => {
    const filteredTeam = teams.find(team => team.teamId === teamId);
    return filteredTeam.name;
  };

  const formatDate = date => {
    return moment(date).format(' MM-DD-YYYY');
  };

  return (
    <div className="cardNfo">
      <span className="teamName">{getTeamName()}</span>
      <span className="date">
        <FontAwesomeIcon icon={faClock} />
        {formatDate(date)}
      </span>
    </div>
  );
};

export default CardInfo;
