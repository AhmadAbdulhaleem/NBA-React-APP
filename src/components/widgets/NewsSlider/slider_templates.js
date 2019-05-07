import React from 'react';
import { Link } from 'react-router-dom';
import './slider.css';

import Slick from 'react-slick';

const SliderTemplates = ({ data, type, sliderSettings }) => {
  let template = null;

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesTo: 1,
    slidesToScroll: 1,
    ...sliderSettings,
  };

  switch (type) {
    case 'featured':
      template = data.map((item, i) => (
        <div key={i}>
          <div className="featured_item">
            <div className="featured_image" style={{ background: `url(${item.image})` }} />
            <Link to={`/articles/${item.id}`}>
              <div className="featured_caption">{item.title}</div>
            </Link>
          </div>
        </div>
      ));
      break;
    default:
      template = null;
  }

  return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplates;
