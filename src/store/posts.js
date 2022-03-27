import firebase from "firebase/app";
import "firebase/auth";
import { getFirestore, collection, query, where, getDocs, orderBy, doc, getDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import db from "../firebase/firebaseInit";


const state = { 
    posts: [],
    post:{},
    postLoaded: null,
    postPreview:{
        text: "Write your blog title here...",
        title: "",
        photoName: "",
        photoFileURL: null,
        photoPreview: null,
    },
}

const getters = {
    postsRecent(state) {
        return state.posts.slice(0, 2);
    },

    posts(state) {
        return state.posts;
    },
}

const actions = {

    async getPosts({ state }) {
        state.postLoaded = false;
        // const querySnapshot = await getDocs(collection(db, "posts"), orderBy("date", "desc"));
        // querySnapshot.forEach((doc) => {
        //     state.posts.push({id:doc.id,...doc.data()});
        // });

        // Listening to realtime changes
        
        onSnapshot(collection(db, "posts"), orderBy("date", "desc"), (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    state.posts.push({id:change.doc.id,...change.doc.data()});
                }
                if (change.type === "modified") {
                    state.posts[state.posts.findIndex((post)=>post.id == change.doc.id)] = {id:change.doc.id,...change.doc.data()}
                }
                if (change.type === "removed") {
                    state.posts = state.posts.filter((post) => post.id !== change.doc.id)
                }
            });
        })

        state.postLoaded = true;
    },


    async getPost({ state }, postId) {
        state.postLoaded = false;
        const res = await getDoc(doc(db, 'posts', postId))
        if (res.exists()) {
            state.post = {id:res.id,...res.data()}
        }
        state.postLoaded = true;
    },

    async deletePost({ commit }, payload) {
        await deleteDoc(doc(db, "posts", payload));
    },
}

const mutations = {
    updatePostText(state, payload) {
        state.postPreview.text = payload;
    },

    updatePostTitle(state, payload) {
        state.postPreview.title = payload;
    },

    fileNameChange(state, payload) {
        state.postPreview.photoName = payload;
    },

    createFileURL(state, payload) {
        state.postPreview.photoFileURL = payload;
    },

    openPhotoPreview(state) {
        state.postPreview.photoPreview = !state.postPreview.photoPreview;
    },

    setPostEditState(state, payload) {
        state.postPreview.title = payload.title;
        state.postPreview.text = payload.text;
        state.postPreview.photoFileURL = payload.coverPhoto;
        state.postPreview.photoName = payload.coverPhotoName;
    },

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
  };