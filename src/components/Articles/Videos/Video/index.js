import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../../config';
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';

import '../../articles.css';
import VideoHeader from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

class VideoArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: [],
  };

  componentDidMount() {
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
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
            this.getRelated();
          });
      });
  }

  getRelated = () => {
    firebaseTeams.once('value').then(snapshot => {
      const teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild('team')
        .equalTo(this.state.article.team)
        .limitToFirst(3)
        .once('value')
        .then(snapshot => {
          const related = firebaseLooper(snapshot);
          this.setState({ teams, related });
        });
    });
  };

  render() {
    const { article, team } = this.state;

    return (
      <div>
        <VideoHeader teamData={team[0]} />
        <div className="videoWrapper">
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          />
        </div>
        <VideosRelated data={this.state.related} teams={this.state.teams} />
      </div>
    );
  }
}

export default VideoArticle;
