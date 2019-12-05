<template>
  <section class="quiz">
    <div class="pt-10 quiz__wrapper">
      <div class="quiz__content" v-if="start">
        <h2 class="quiz__title">野生の{{this.quizList[this.currentIndex].title}}があらわれた！</h2>
        <ul class="quiz__list">
          <li>
            <input type="radio" id="guess0" name="guess" value="0" v-model="selected" />
            <label for="guess0">{{this.quizList[this.currentIndex].guessList[0]}}</label>
          </li>
          <li>
            <input type="radio" id="guess1" name="guess" value="1" v-model="selected" />
            <label for="guess1">{{this.quizList[this.currentIndex].guessList[1]}}</label>
          </li>
          <li>
            <input type="radio" id="guess2" name="guess" value="2" v-model="selected" />
            <label for="guess2">{{this.quizList[this.currentIndex].guessList[2]}}</label>
          </li>
          <li>
            <input type="radio" id="guess3" name="guess" value="3" v-model="selected" />
            <label for="guess3">{{this.quizList[this.currentIndex].guessList[3]}}</label>
          </li>
        </ul>

        <button @click.prevent="answerCollection()">→ 正体を暴く！</button>

        <div class="quiz__result" 　v-if="answered">
          <div class="quiz__correct" v-if="correct">
            <p>おめでとう！正解だよ！ヽ(ﾟ∀ﾟ)ﾉ</p>
            <button @click.prevent="toNextQuestion()">次も頑張る！</button>
          </div>

          <div class="quiz__wrong" v-if="!correct">
            <p>残念(´·ω·`)</p>
            <p>
              正しい答えは
              <span
                style="color:red"
              >{{this.quizList[this.currentIndex].guessList[this.quizList[this.currentIndex].answer]}}</span>
              " だよ！
            </p>
            <button @click.prevent="toNextQuestion()">次は頑張る！</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      //list of quizzes.
      quizList: [],

      //list to keep track user answers.
      answeres: [],

      //if the user answered or not
      answered: false,

      //if the user selected correct answer
      correct: false,

      //selected
      selected: 0,

      //list of recently searched words
      words: this.$store.getters.getWords,

      //Is ready to start quiz
      start: false,

      //current index of quiz
      currentIndex: 0
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
      //since max 10 quiz will be generated.
      length = length > 10 ? 10 : length;
      //number of dummy words to request.
      let requestNum = length > maxLength ? 30 : length * 3;
      //get dummywords.
      let dummyWords = await this.fetchQuiz(requestNum);
      //randomly select words which wil be in the quiz.
      //words which will be used from words lists.
      let quizWords = this.selectQuizWord(length);
      //Then create a quiz list with quiz object.
      for (let i = 0; i < length; i++) {
        //data.splice(targetIndex,0,'a')
        //number which indicates where the answer will be in.
        let answerNum = Math.floor(Math.random() * 4);
        let guessList = [];
        for (let j = 0; j < 3; j++) {
          guessList.push(dummyWords[j + i * 3].mean);
        }
        guessList.splice(answerNum, 0, quizWords[i].def);
        this.quizList.push({
          title: quizWords[i].word,
          answer: answerNum,
          guessList: guessList
        });
      }
    },

    //select random words from words list/
    //returns array of random words.
    selectQuizWord(listLength) {
      //Not to make vuex mad.
      let tempList = this.words.concat();
      let selectedWords = [];
      for (let i = 0; i < listLength; i++) {
        let randomNum = Math.floor(Math.random() * tempList.length);
        selectedWords.push(tempList[randomNum]);
        //To avoid guessduplication.
        tempList = tempList.filter(function(value) {
          return value.def != tempList[randomNum].def;
        });
      }
      return selectedWords;
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
    },

    answerCollection() {
      this.answered = true;

      if (this.selected == this.quizList[this.currentIndex].answer) {
        alert("正解");
        this.correct = true;
      } else {
        this.correct = false;
      }
    },

    toNextQuestion() {
      this.answeres.push(this.selected);
      this.currentIndex++;
      this.answered = false;
    }
  },

  created: async function() {
    if (this.words.length != 0) {
      await this.generateQuiz();
      this.start = true;
    } else {
      alert("先に単語をロードする必要があります。");
      return this.$router.push("/app");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

