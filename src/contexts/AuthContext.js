import React, {useContext, useEffect, useState} from 'react'
import {auth} from "../firebase";
import Firebase from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function addPet(name, sex, age, email) {
        let pet = {name, sex, age, email}
        Firebase.database("https://puddle-pet-default-rtdb.europe-west1.firebasedatabase.app").ref('pets').push(pet, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(err)
            }
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        addPet
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
