<template>
  <form class="form mt-4 d-b" id="form">
    <div class="d-ib form__wrapper mx-auto">
      <input type="text" placeholder="検索したい単語を入力してね(°▽°)" v-model="word" class="form__input" />
      <a class="form__btn" @click.prevent="fetchWordDefinition()">検索する</a>
      <h2>{{this.updated}}</h2>
    </div>
  </form>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      word: "",
      wordDef: "",
      updated: this.$store.getters.getUpdated
    };
  },

  methods: {
    //function to fetch word data from tangodojo api.
    //Data will be returned in array form.
    async fetchWordDefinition() {
      const definition = await this.$axios.$get(
        "https://tango-dojo-api.herokuapp.com/word",
        {
          params: {
            searchWord: this.word
          }
        }
      );

      this.wordDef = definition[0].mean;
      this.addWord(this.word, this.wordDef);
      this.$store.commit("updateUpdated", true);
      this.word = "";
    },

    //add word and it's definition to firebase collection.
    addWord(word, def) {
      firebase
        .firestore()
        .collection("words")
        .doc(word)
        .set({
          word: word,
          def: def
        });
    }
  },
  watch: {
    updated: function() {
      console.log("updatedの値が変更されたよ!!");
      this.updated = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


