<template>
  <table class="table mx-auto">
    <h2>{{this.user}}</h2>
    <tr class="table__row">
      <th>単語</th>
      <th>定義</th>
    </tr>
    <tr v-for="word in this.words" :key="word.word" class="table__row">
      <td>{{word.word}}</td>
      <td>{{word.def}}</td>
    </tr>
    <button @click.prevent="modifyWord()">words モディファイやー</button>
  </table>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      words: this.$store.getters.getWords,
      user: this.$store.getters.getUser,
      wordsList: [],
      wordsLength: 0
    };
  },

  created() {
    this.fetchDataFirebase();

    /* 
   this.wordsLength = this.$store.getters.getWordsLength;
    */
  },

  watch: {
    words: function() {
      console.log("words has been modified");
    }
  },

  methods: {
    /* Fetch all words from firebase store it in vuex  */
    fetchDataFirebase() {
      let self = this;
      let listing = [];
      firebase
        .firestore()
        .collection("words")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.$store.commit("addWords", doc.data());
          });
        });
    },

    modifyWord() {
      alert(this.$store.getters.getWordsLength);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>