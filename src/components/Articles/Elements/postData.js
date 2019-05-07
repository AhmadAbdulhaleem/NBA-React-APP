import React from 'react';
import moment from 'moment';
import '../articles.css';

const PostData = ({ data }) => {
  const formatDate = date => {
    return moment(date).format(' MM-DD-YYYY');
  };

  return (
    <div className="articlePostData">
      <div>
        Date: <span>{formatDate(data.date)}</span>
      </div>
      <div>
        Author: <span>{data.author}</span>
      </div>
    </div>
  );
};

export default PostData;
