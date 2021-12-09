
import { toast } from "react-toastify";
import { firestore } from "../../services/firebase";
import { SET_ALL_USER, SET_SEARCH_FILTER } from "../actionTypes";


export const setAllUsers = (users) => ({
    type: SET_ALL_USER,
    payload: users
})

export const setSearchFilter = (filteredUsers) => ({
    type: SET_SEARCH_FILTER,
    payload: filteredUsers
})


export const createUserDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
   
    const userId = userAuth.uid
    const userRef = firestore.doc(`users/${userId}`);
    const createdAt = new Date();
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email } = userAuth
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
    return {
        userId,
        ...userData
    }
}

export const saveUserDocument = async (userId, data) => {
    if (!userId) return;
    const userRef = firestore.doc(`users/${userId}`);
    try {
        await userRef.update({
            ...data,
        })
    } catch (error) {
        console.log(error)
    }
 

}

export const saveAndReadUserDocument = async (userId, data) => {
    if (!userId) return;
    const userRef = firestore.doc(`users/${userId}`);
    try {
        await userRef.update({
            ...data,
        })
    } catch (error) {
        console.log(error)
    }


    const userData = await (await userRef.get()).data()
    delete userData.email
    return userData
}