import React from 'react';
import '../articles.css';

const TeamNfo = ({ team }) => {
  return (
    <div className="articleTeamHeader">
      <div className="left" style={{ background: `url(/images/teams/${team.logo})` }} />
      <div className="right">
        <div className="">
          <span>
            {team.city} {team.name}
          </span>
        </div>
        <div className="">
          <strong>
            W{team.stats[0].wins}-L{team.stats[0].defeats}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default TeamNfo;
