import { createSlice } from "@reduxjs/toolkit";
import { getWordCheckThunk } from "../checkWord/checkWordThunks";

export const AttemptsSlice = createSlice({
  name: "attempt",
  initialState: {
    attempts: [],
    isLoading: false,
    isValid: false,
    error: null
  },
  reducers: {
    newAttempt(state, action) {
      state.attempts.push({
        slots: Array.from({ length: action.payload }, () => ({
          slotId: Math.random(),
          letter: null,
          color: null,
        })),
        fullfied: false,
      });
    },

    modifySlot(state, action) {
      let attemptToModify = null;
      state.attempts.forEach((attempt) => {
        attempt.slots.forEach((slot) => {
          if (slot.slotId === action.payload.slotId) {
            attemptToModify = attempt;
            slot.letter = action.payload.letter;
            slot.color = action.payload.color || slot.color;
          }
        });
      });

      attemptToModify.fullfied = attemptToModify.slots.every(
        (slot) => !!slot.letter
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWordCheckThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWordCheckThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isValid = action.payload;
      state.error = null;

     
    });
    builder.addCase(getWordCheckThunk.rejected, (state, action) => {
      console.log("getWordCheckThunk.rejected", action.payload);
      state.isLoading = false;
      state.isValid = false;
      state.error = action.error.message;
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



export const { newAttempt, modifySlot, attempts } = AttemptsSlice.actions;
