import Rebase from 're-base';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBHtGnkabNR--JtXQL6TPmvxSVjrA2FQ4k",
    authDomain: "catch-of-the-day-harsha.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-harsha.firebaseio.com"
}


const app = firebase.initializeApp(firebaseConfig)
const base = Rebase.createClass(app.database())

export default base;