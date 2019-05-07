import React from 'react';
import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = props => {
  return (
    <div>
      <NewsSlider type="featured" start={0} end={3} settings={{ dots: false }} />
      <NewsList type="cardMain" loadMore={true} start={3} amount={3} />
    </div>
  );
};

export default NewsMain;
