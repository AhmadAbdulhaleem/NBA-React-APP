import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyChrDWG7g1x4PsRSJXhgAUQiEr7WGrZvco',
  authDomain: 'nba-app-45f24.firebaseapp.com',
  databaseURL: 'https://nba-app-45f24.firebaseio.com',
  projectId: 'nba-app-45f24',
  storageBucket: 'nba-app-45f24.appspot.com',
  messagingSenderId: '843915707555',
  appId: '1:843915707555:web:610b9731525543d1',
};

firebase.initializeApp(firebaseConfig);

const firebaseLooper = snapshot => {
  const data = [];

  snapshot.forEach(snapshotChild => {
    data.push({
      ...snapshotChild.val(),
      id: snapshotChild.key,
    });
  });
  return data;
};

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

export { firebase, firebaseLooper, firebaseDB, firebaseArticles, firebaseTeams, firebaseVideos };
