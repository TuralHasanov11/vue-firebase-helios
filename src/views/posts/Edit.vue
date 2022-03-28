<template>
  <div class="create-post">
    <PostCoverPreview v-show="$store.state.posts.postPreview.photoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="postTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !$store.state.posts.postPreview.photoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ $store.state.posts.postPreview.photoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="postText" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'PostPreview' }">Preview Changes</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, orderBy, doc, getDoc, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, fileStorage } from "@/firebase/firebaseInit";
import db from "@/firebase/firebaseInit";
import Loading from "@/components/Loading";
import "firebase/storage";
import Quill from "quill";
import PostCoverPreview from "@/components/PostCoverPreview.vue";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "PostsEditView",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    Loading,
    PostCoverPreview
  },

  async created(){
    await this.$store.dispatch('posts/getPost', this.$route.params.post)
  },

  watch:{
    post: function(p){
      if(p.user_id != auth.currentUser.uid){
        this.$router.replace({name:'Home'})
      }else{
        this.$store.commit('posts/setPostEditState', p)
      }
    }
  },

  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("posts/fileNameChange", fileName+(Math.random() + 1).toString(36).substring(7));
      this.$store.commit("posts/createFileURL", URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit("posts/setBlogState", this.post);
      this.$store.commit("posts/openPhotoPreview");
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
       const storageRef = ref(fileStorage, `helios/postsPhotos/${file.name}`);
    
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          console.log(snapshot);
        }, 
        (error) => {
        }, 
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          });
        }
      );
    },
    async updateBlog() {

      if (this.postTitle.length !== 0 && this.postText.length !== 0) {
        if (this.file != null) {
          this.loading = true;
          const storageRef = ref(fileStorage, `helios/PostsCoverPhotos/${this.$store.state.posts.postPreview.photoName}`);
          const uploadTask = uploadBytesResumable(storageRef, this.file);

          uploadTask.on('state_changed', 
            (snapshot) => {
              console.log(snapshot);
            }, 
            (error) => {
              console.log(error);
              this.loading = false;
            }, 
            async () => {

              await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                const docRef = await updateDoc(doc(db, 'posts', this.post.id), {
                  text: this.postText,
                  coverPhoto: downloadURL,
                  coverPhotoName: this.postCoverPhotoName,
                  title: this.postTitle,
                });
                this.$store.commit('posts/clearPostPreview')
                this.loading = false;
                this.$router.push({ name: "Post", params: { post: this.post.id } });
              });

            }
          );

          return;
        }

        this.loading = true;

        await updateDoc(doc(db, 'posts', this.post.id), {
          text: this.postText,
          title: this.postTitle,
        });
        this.$store.commit('posts/clearPostPreview')
        this.loading = false;
        this.$router.push({ name: "Post", params: { post: this.post.id } });

        return;
      }

      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";

      setTimeout(() => {
        this.error = false;
      }, 5000);

      return;
    },
  },
  computed: {
    post(){
      return this.$store.state.posts.post
    },

    postCoverPhotoName() {
      return this.$store.state.posts.postPreview.photoName;
    },

    postTitle: {
      get() {
        return this.$store.state.posts.postPreview.title;
      },
      set(payload) {
        this.$store.commit("posts/updatePostTitle", payload);
      },
    },

    postText: {
      get() {
        return this.$store.state.posts.postPreview.text;
      },
      set(payload) {
        this.$store.commit("posts/updatePostText", payload);
      },
    },
  },
};
</script>

<style>
.create-post {
  position: relative;
  height: 100%;
}

.create-post button {
    margin-top: 0;
}

.create-post .router-button {
    text-decoration: none;
    color: #fff;
}

.create-post label,
.create-post button,
.create-post .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 0.8em;
    cursor: pointer;
    border-radius: 1.25em;
    padding: 0.75em 1.5em;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
}

.create-post .router-button:hover {
    background-color: rgba(48, 48, 48, 0.7);
}

.create-post .container {
    position: relative;
    height: 100%;
    padding: 0.6em 1.5em 3.75em;
}

.create-post .invisible {
    opacity: 0 !important;
}

.create-post .err-message {
    width: 100%;
    padding: 0.75em;
    border-radius: 0.5em;
    color: #fff;
    margin-bottom: 0.6em;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
  }

.create-post .err-message p {
    font-size: 0.8em;
}
.create-post .err-message span {
    font-weight: 600;
}

.create-post .blog-info {
    display: flex;
    margin-bottom: 2em;
}

.create-post .blog-info input:nth-child(1) {
    min-width: 18em;
}
.create-post .blog-info input {
    transition: 0.5s ease-in-out all;
    padding: 0.6em 0.25em;
    border: none;
    border-bottom: 0.1em solid #303030;
}
.create-post .blog-info input:focus {
    outline: none;
    box-shadow: 0 0.1em 0 0 #303030;
}
.create-post .blog-info .upload-file {
    flex: 1;
    margin-left: 1em;
    position: relative;
    display: flex;
}

.create-post .blog-info .upload-file input {
    display: none;
}
.create-post .blog-info .upload-file .preview {
    margin-left: 1em;
    text-transform: initial;
}
.create-post .blog-info .upload-file span {
    font-size: 0.75em;
    margin-left: 1em;
    align-self: center;
}

.create-post .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
}

.create-post .editor .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.create-post .editor .ql-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
}
.create-post .editor .ql-editor {
    padding: 1.25em 1em 1.8em;
}

.create-post .blog-actions {
    margin-top: 2em;
}

.create-post .blog-actions button {
    margin-right: 1em;
}
</style>