<template>
  <section class="quiz">
    <div class="pt-7 quiz__wrapper">
      <button @click.prevent="generateQuiz()">クイズ作成！</button>
      <button @click.prevent="fetchQuiz(10)">問題をとりにいくよ！(^_^)</button>
      <button @click.prevent="selectQuizWord('3')">test selectQuizWord</button>
      <!--   <div class="quiz__content">
        <h2 class="quiz__title">{{quiz.word}}の意味を選べ( ･`ω･´)</h2>
        <ul class="quiz__list">
          <li class="qioz__list-item">{{quiz.def}}</li>
          <li class="qioz__list-item">{{quiz.def}}</li>
          <li class="qioz__list-item">{{quiz.def}}</li>
        </ul>
      </div>-->
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      //count of how many question user answered.
      answered: 0,

      //list of quizzes.
      quizList: [],

      //list to keep track user answers.
      answeres: [],

      //list of recently searched words
      words: this.$store.getters.getWords
    };
  },
  methods: {
    /* 
    create a quizzes 10 max 
    */
    async generateQuiz() {
      //max quiz number to generate.
      let maxLength = 10;

      //get the length of words.
      let length = this.$store.getters.getWordsLength;

      //number of dummy words to request.
      let requestNum = length > maxLength ? 30 : length * 3;

      //get dummywords.
      let dummyWords = await this.fetchQuiz(requestNum);

      //randomly select words which wil be in the quiz.
      //words which will be used from words lists.
      let quizWords = this.selectQuizWord(requestNum);

      //Then create a quiz list with quiz object.
      for (let i = 0; i < length; i++) {
        //number which indicates where the answer will be in.
        let answerNum = Math.floor(Math.random() * 4);

        //push quizzes to quizlist
        //I need to think better way to create quiz object.
        this.quizList.push({
          title: quizWords[i].word,
          answer: answerNum,
          question1:

        });
      }
    },

    //select random words from words list/
    //returns array of random words.
    selectQuizWord(requestNum) {
      //Not to make vuex angry.
      let tempList = this.words.concat();
      console.log(tempList, "before removed");

      //I should not use request num for this loop
      //Since the size of temlist is shrinking
      for (let i = 0; i < requestNum; i++) {
        let randomNum = Math.floor(Math.random() * tempList.length);
        this.quizList.push(tempList[randomNum]);

        //remove used words 
        tempList = tempList.filter(function(value) {
          return value.def != tempList[randomNum].def;
        });
      }
      return tempList;
    },

    /* 
    fetch random number of words data based on requestNum.
    requestNum:integer expected.
    */
    async fetchQuiz(requestNum) {
      let quizzes = await this.$axios.$get(
        "https://tango-dojo-api.herokuapp.com/quiz",
        {
          params: {
            number: requestNum
          }
        }
      );
      return quizzes;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

