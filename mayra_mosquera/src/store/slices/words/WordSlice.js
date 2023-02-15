import { createSlice } from "@reduxjs/toolkit";

export const WordSlice = createSlice({
  name: "word",
  initialState: {
    word: [],
    isCorrectWord: false,
    noCorrectWord: true,
  },
  reducers: {
    // startLoadingWord: (state) => {
    //   state.isLoading = true;
    // },
    // rejectedWord: (state, action)=>{

    // },
    addNewWordElement: (state, action) => {      
      state.word = [...state.word, action.payload];     
    },
  },
});

export const {startLoadingWord, setWord} = WordSlice.actions;
