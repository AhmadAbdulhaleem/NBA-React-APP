import React, { Component } from 'react';
// import axios from 'axios';
import SliderTemplates from './slider_templates';
// import { URL } from '../../../config';

import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';

class Slider extends Component {
  state = {
    news: [],
  };

  componentDidMount() {
    firebaseArticles
      .limitToFirst(3)
      .once('value')
      .then(snapshot => {
        const news = firebaseLooper(snapshot);
        // news.forEach((item, i) => {
        //   firebase
        //     .storage()
        //     .ref('images')
        //     .child(item.image)
        //     .getDownloadURL()
        //     .then(url => {
        //       news[i].image = url;
        //       this.setState({ news });
        //     });
        // });

        const asyncFunction = (item, i, cb) => {
          firebase
            .storage()
            .ref('images')
            .child(item.image)
            .getDownloadURL()
            .then(url => {
              news[i].image = url;
              cb();
            });
        };

        let requests = news.map((item, i) => {
          return new Promise((resolve, reject) => {
            asyncFunction(item, i, resolve);
          });
        });

        Promise.all(requests).then(() => {
          this.setState({ news });
        });
      });
  }

  render() {
    return (
      <SliderTemplates
        data={this.state.news}
        type={this.props.type}
        sliderSettings={this.props.settings}
      />
    );
  }
}

export default Slider;
