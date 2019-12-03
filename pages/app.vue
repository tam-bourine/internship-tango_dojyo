<template>
  <section class="app">
    <div class="app__wrapper">
      <h2 style="font-size:32px; color:blue; margin-top:32px; ">アプリケーションのページだよ♪( ´▽｀)</h2>
      <Form />
      <Table />
      <button @click.prevent="fetchDataFirebase()">テストフェッチメソッド</button>
      <button @click.prevent="testRun()">テストランメソッド</button>
      <nuxt-link to="/quiz">クイズを受けてみる</nuxt-link>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import Form from "~/components/Form.vue";
import Table from "~/components/Table.vue";

export default {
  components: { Form, Table },
  data() {
    return {
      name: this.$store.state.name
    };
  },

  created() {},

  methods: {
    testPost() {
      const ref = firebase
        .firestore()
        .collection("test")
        .doc("test")
        .set({
          test: "testing",
          name: "manaki"
        });
    },

    testRun() {},

    async testNode() {
      let result = await this.$axios.$get(
        "http://dummy.restapiexample.com/api/v1/employees",
        {
          params: {
            word: "testWord"
          }
        }
      );
      console.log(result);
    },

    testGetWord() {
      console.log("called");
      fetch("https://wordsapiv1.p.rapidapi.com/words/hatchback", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key":
            "d5adf56997mshc9b40a9becdd712p1ae03djsnbc3c6d1aaf69",
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(body => console.log(body));
    }
  }
};
</script>

<style lang="scss">
</style>