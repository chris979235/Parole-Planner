import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID} from '@env'

const firebaseConfig = {
  apiKey: "AIzaSyA90TxhPn0H-hPzn96KJnnpXOc9Pq0q6OY",
  authDomain: "probation-planner-a0406.firebaseapp.com",
  databaseURL: "https://probation-planner-a0406.firebaseio.com",
  projectId: "probation-planner-a0406",
  storageBucket: "probation-planner-a0406.appspot.com",
  messagingSenderId: "94393770827",
  appId: "1:94393770827:web:975046c0e064589d687ece"
}

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    async register(email, password, firstName, lastName){
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: `${firstName} ${lastName}`
        })
    }

    async passwordReset(email){
        return this.auth.sendPasswordResetEmail(email)
    }

   
}

export default new Firebase()