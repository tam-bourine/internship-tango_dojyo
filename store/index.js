export const state = () => ({

  //holds user login info
  user: '',
  //holds user's words history
  words: []

});

//mutations to change value in state.
export const mutations = {

  //push word to words list
  addWords(state, payload) {
    console.log("called from store! addWords => ", state.words);
    state.words.push(payload);
  },

  //update words variable
  updateWords(state, payload) {

    console.log("called from store! words =>", state.words);
    state.words = payload;
  },

  //update user variable
  updateUser(state, payload) {
    console.log('called from store! user =>', payload);
  }

}

//getters to get value from store.
export const getters = {

  //return user info
  getUser(state) {
    return state.user;
  },

  //return words info
  getWords(state) {
    return state.words;
  },


  //
  getWordsLength(state) {
    let count = 0;
    let i = '';
    for (i in state.words) {
      count++;
    }
    return count;
  }


}
