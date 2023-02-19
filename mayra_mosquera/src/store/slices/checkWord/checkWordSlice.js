import { createSlice } from "@reduxjs/toolkit";
import { getWordCheckThunk } from "./checkWordThunks";

export const CheckWordSlice = createSlice({
  name: "checkWord",
  initialState: {
    checkWord: null,
    iSLoading: false,
    isValid: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWordCheckThunk.pending, (state) => {
      state.checkWordIsLoading = true;
    });
    builder.addCase(getWordCheckThunk.fulfilled, (state) => {
      state.checkWordIsLoading = false;
      
    });
    builder.addCase(getWordCheckThunk.rejected, (state, action) => {
      state.checkWordIsLoading = false;
      state.checkWordIsvalid = true;
      state.checkWordError = action.error.message;
    });
  },
});

export const getWordFromAttempt = (attempt) => {
  return attempt.slots.map((slot) => slot.letter || " ").join("");
};

export const getCurrentAttempt = (state) => {
  console.log("getCurrentAttempt", state);
  return state.attempts[state.attempts.length - 1] || null;
};

export const {
  checkWord, 
} = CheckWordSlice.actions;
