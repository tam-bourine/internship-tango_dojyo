export const state = () => ({

  //holds user login info
  user: '',
  //holds user's words history
  words: [],
  //true/if user has added/deleted/editted words list
  updated: false

});

//mutations to change value in state.
export const mutations = {

  //push word to words list
  addWords(state, payload) {
    // console.log("called from store! addWords => ", state.words);
    console.log('this has been passed ', payload);
    state.words.push(payload);
    console.log(state.words, "this is what you know")
  },

  //update words variable
  updateWords(state, payload) {
    console.log(payload, 'this was passed');
    state.words = payload;
  },

  //update user variable
  updateUser(state, payload) {
    //  console.log('called from store! user =>', payload);
  },

  //update updated variable
  updateUpdated(state, payload) {
    //console.log('called from store! updated =>', payload);
    state.updated = payload;
  },

  resetWords(state, payload) {
    //console.log("words will be updated to ", payload);
    state.words = payload;
    console.log(state.words)
    alert('reset variable', state.words);
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


  getUpdated(state) {
    return state.updated;
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
