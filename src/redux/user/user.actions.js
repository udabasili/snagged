import { toast } from "react-toastify";
import { auth, f, database, firestore } from "../../services/firebase";
import { SET_CURRENT_USER, 
    SET_USER_PREFERENCE_VALUES,
    SET_USER_REGISTRATION_STATUS, 
    SHOW_CHAT_WINDOW, 
    SHOW_HELP_WINDOW 
    } from "../actionTypes";

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
})

export const setUserPreferences = (preferences) => ({
    type: SET_USER_PREFERENCE_VALUES,
    payload: preferences
})

export const chatWindowHandler = (showChatWindow) => ({
    type: SHOW_CHAT_WINDOW,
    payload: showChatWindow

})

export const helpWindowHandler = (showHelpWindow) => ({
    type: SHOW_HELP_WINDOW,
    payload: showHelpWindow

})

export const setUserRegistrationStatus = (fullyRegistered) => ({
    type: SET_USER_REGISTRATION_STATUS,
    payload: fullyRegistered

})
export const facebookRegistration = () =>{
    var provider = new f.auth.FacebookAuthProvider();
    provider.addScope('email')
     auth.signInWithRedirect(provider)
        .then(response =>{
            const token = response.credential.accessToken;
            const user = response.user;
        })
        .catch(error =>{

            toast.error(error.message)
        })
}



export const facebookLogin = () => {

}


export const checkUserOnlineStatus = () =>{
    let currentUser = auth.currentUser
    if(currentUser !== null){
        let uid = currentUser.uid
        var userStatusDatabaseRef = database.ref('/status/' + uid);
        var isOfflineForDatabase = {
            state: 'offline',
            last_changed: f.database.ServerValue.TIMESTAMP,
        };

        var isOnlineForDatabase = {
            state: 'online',
            last_changed: f.database.ServerValue.TIMESTAMP,
        };

       
        database.ref('.info/connected').on('value', function (snapshot) {
            if (snapshot.val() === false) {
                return;
            };
            userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function () {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
      
    }
}

export const addToFavorite = async (favoredUserId) =>{
    let currentUserId  = auth.currentUser.uid
    const userRef = firestore.doc(`users/${currentUserId}`);
            try {
            await userRef.update({
                favorites: f.firestore.FieldValue.arrayUnion(favoredUserId)
            })
        } catch (error) {
            toast.error('Something went wrong. Try again later')
        }
    
}

export const removeFromFavorite = async (favoredUserId) =>{
    let currentUserId = auth.currentUser.uid
    const userRef = firestore.doc(`users/${currentUserId}`);
            try {
            await userRef.update({
                favorites: f.firestore.FieldValue.arrayRemove(favoredUserId)
            })

        } catch (error) {
            toast.error('Something went wrong. Try again later')
            console.log(error)
        }
    
}