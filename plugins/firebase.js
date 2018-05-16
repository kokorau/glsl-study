import firebase from 'firebase'

// kokorau-player
firebase.initializeApp({
  apiKey: 'AIzaSyCojWG5PgM0Of0VkFq_QnF85B2OgviMzBs',
  authDomain: 'kokorau-player.firebaseapp.com',
  databaseURL: 'https://kokorau-player.firebaseio.com',
  projectId: 'kokorau-player',
  storageBucket: 'kokorau-player.appspot.com',
  messagingSenderId: '718660724531',
})

const storage = firebase.storage()

export { storage }
