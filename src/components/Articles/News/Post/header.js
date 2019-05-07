import React from 'react';
import TeamNfo from '../../Elements/teamNfo';
import PostData from '../../Elements/postData';

const ArticleHeader = ({ teamData, date, author }) => {
  const teamNfo = team => {
    return team ? <TeamNfo team={team} /> : null;
  };

  const postData = (date, author) => <PostData data={{ date, author }} />;

  return (
    <div>
      {teamNfo(teamData)} {postData(date, author)}
    </div>
  );
};

export default ArticleHeader;
