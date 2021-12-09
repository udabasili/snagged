import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/firebase';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyBJiEBr57KiV7DA9gRdpYQ7sDWc9WYXkhc",
    authDomain: "snagged-bab1f.firebaseapp.com",
    projectId: "snagged-bab1f",
    storageBucket: "snagged-bab1f.appspot.com",
    messagingSenderId: "576098472067",
    appId: "1:576098472067:web:0f16f2eb6af715ed658bb6",
    measurementId: "G-ST6KV4NPP3"
};
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
export const f = firebase;
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const database = firebase.database()
export const analytics = firebase.analytics()

export const createUserDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userId = userAuth.uid
    const userRef = firestore.doc(`users/${userId}`);
    const createdAt = new Date();
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const {email} = userAuth
        try {
            await userRef.set({
                ...additionalData,
                email,
                createdAt,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const userData = await (await userRef.get()).data()
    delete userData.email
    return{
        userId,
        ...userData
    }
}