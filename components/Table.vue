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

    <button @click.prevent="checker()">メソッドチェッカー</button>
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
      wordsLength: 0,
      dumyWords: [
        {
          word: "hunger",
          def: "お腹が減ったぞーい"
        },

        {
          word: "eat",
          def: "食べるぞーい"
        }
      ]
    };
  },

  created() {
    this.fetchDataFirebase();
    this.words = this.$store.getters.getWords;
    console.log(this.words, "created ");
  },

  computed: {
    updated: function() {
      return this.$store.getters.getUpdated;
    }
  },

  watch: {
    updated() {
      this.$nextTick(() => {
        console.log("updated has been updated from form post");
        console.log("value was true");
        this.fetchDataFirebase();
        this.$store.commit("updateUpdated", false);
        this.words = this.$store.getters.getWords;
      });
    }
  },

  methods: {
    /* Fetch all words from firebase store it in vuex  */
    async fetchDataFirebase() {
      //reset list
      console.log("called");
      //this.$store.commit("resetWords", []);
      //reference to vue
      let self = this;
      let testList = [];
      firebase
        .firestore()
        .collection("words")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            testList.push(doc.data());
            console.log("1");
          });
        })
        .then(function() {
          console.log(2);
          console.log(testList);

          self.$store.commit("updateUpdated", false);
          self.$store.commit("updateWords", testList);
          self.words = self.$store.getters.getWords;
        });
      //this.$store.commit("updateWords", tempList);
    },

    checker() {
      this.words = this.$store.getters.getWords;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>