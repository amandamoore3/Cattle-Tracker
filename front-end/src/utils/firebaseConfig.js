import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD0PtzK1SvkKNdNf5te8MWIYlfGhoLsHtY",
  authDomain: "cattle-tracks.firebaseapp.com",
  databaseURL: "https://cattle-tracks.firebaseio.com",
  projectId: "cattle-tracks",
  storageBucket: "",
  messagingSenderId: "851163474434"
};

let app = firebase.initializeApp(config);

export default { config };