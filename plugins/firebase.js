import firebase from 'firebase'

const config = {

  // projectId: process.env.FIREBASE_PROJECT_ID
  projectId: "tango-dojo"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
