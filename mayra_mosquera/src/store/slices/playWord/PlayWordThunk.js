import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomWord } from "../../../api/WordApi";

export const getWordPlayThunk = createAsyncThunk(
   'word/new',
   async () => {
     const word = await getRandomWord()
     return word;
   }
 )


// export const getWordPlay = () => {
//    return async (dispatch, getState) => {
//       dispatch(startLoadingPlayWord());
//       const newWord = getRandomWord();
//       dispatch(setPlayWord(newWord));
//    }
   
// }