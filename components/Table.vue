<template>
  <table class="table mx-auto">
    <h2>{{this.user}}</h2>
    <tr class="table__row">
      <th class="table__head">単語</th>
      <th class="table__head">定義</th>
    </tr>
    <tr v-for="word in this.words" :key="word.word" class="table__row">
      <td class="table__data">{{word.word}}</td>
      <td class="table__data">{{word.def}}</td>
    </tr>

    <button @click.prevent="checker()">メソッドチェッカー</button>
  </table>
</template>

<style lang="scss" scoped>
</style>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      //holds list of word
      words: this.$store.getters.getWords,

      //holds list of users
      user: this.$store.getters.getUser
    };
  },

  created() {
    this.fetchDataFirebase();
    this.words = this.$store.getters.getWords;
    console.log(this.words, "created ");
  },

  computed: {
    //To watch getUpdated variables
    updated: function() {
      return this.$store.getters.getUpdated;
    }
  },

  //if word was add/delete/editted update value of updated/words
  watch: {
    updated() {
      this.$nextTick(() => {
        this.fetchDataFirebase();
        this.$store.commit("updateUpdated", false);
        this.words = this.$store.getters.getWords;
      });
    }
  },

  methods: {
    //fetch all searched words from firebase firestore.
    //store it in vuex state words.
    async fetchDataFirebase() {
      //referemce to vue object.
      let self = this;

      //temporary list to hold firebase data.
      let tempList = [];

      firebase
        .firestore()
        .collection("words")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            tempList.push(doc.data());
          });
        })
        .then(function() {
          self.$store.commit("updateUpdated", false);
          self.$store.commit("updateWords", tempList);
          self.words = self.$store.getters.getWords;
        });
      //this.$store.commit("updateWords", tempList);
    },

    //function tester
    checker() {
      console.log(this.$store.getters.getWordsLength);
    }
  }
};
</script>

