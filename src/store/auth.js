import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {auth} from "../firebase/firebaseInit"
import { signOut } from "firebase/auth";


export default {
    state: { 
        user: null,
        token:null,
        profile:{
            id: null,
            email: null,
            firstName: null,
            lastName: null,
            username: null,
            initials: null,
        }
    },

    getters: {

    },
    actions: {

        async authenticate({commit}){
            auth.onAuthStateChanged(async (user) => {
                commit("updateUser", user);
                if (user) {
                    const res = await getDoc(doc(db, 'users', user.uid))
                    if (res.exists()) {
                        commit("setProfileInfo", res);
                        commit("setProfileInitials");
                        return res
                    }
                }
            });
        },

        async updateUserSettings({ commit, state }) {
            await updateDoc(doc(db, 'users', state.profile.id), {
              firstName: state.profile.firstName,
              lastName: state.profile.lastName,
              username: state.profile.username,
            });
            commit("setProfileInitials");
        },

        async logout(){
            signOut(auth).then(() => {
                return true
            }).catch((error) => {
                throw new Error('Could not logout')
            });
        }
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload;
        },

        setProfileInfo(state, doc) {
            state.profile.id = doc.id;
            state.profile.email = doc.data().email;
            state.profile.firstName = doc.data().firstName;
            state.profile.lastName = doc.data().lastName;
            state.profile.username = doc.data().username;
        },

        setProfileInitials(state) {
            state.profile.initials = state.profile.firstName.match(/(\b\S)?/g).join("") + state.profile.lastName.match(/(\b\S)?/g).join("");
        },

        changeFirstName(state, payload) {
            state.profile.firstName = payload;
        },

        changeLastName(state, payload) {
            state.profile.lastName = payload;
        },

        changeUsername(state, payload) {
            state.profile.username = payload;
        },
    },
    namespaced: true,
}