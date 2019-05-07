import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../../config';

import { firebase, firebaseDB, firebaseLooper, firebaseTeams } from '../../../../firebase';

import '../../articles.css';
import ArticleHeader from './header';

class NewsArticles extends Component {
  state = { article: [], team: [], imageURL: '' };

  componentWillMount() {
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once('value')
      .then(snapshot => {
        const article = snapshot.val();

        firebaseTeams
          .orderByChild('teamId')
          .equalTo(article.team)
          .once('value')
          .then(snapshot => {
            const team = firebaseLooper(snapshot);
            this.setState({ article, team });
            this.getImageUrl(article.image);
          });
      });
  }

  getImageUrl = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageURL: url });
      });
  };

  render() {
    const { article, team } = this.state;

    return (
      <div className="articleWrapper">
        <ArticleHeader teamData={team[0]} date={article.date} author={article.author} />

        <div className="articleBody">
          <h1>{article.title}</h1>
          <div className="articleImage" style={{ background: `url('${this.state.imageURL}')` }} />
          <div className="articleText" dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      </div>
    );
  }
}

export default NewsArticles;
