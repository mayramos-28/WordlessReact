import { createSlice } from "@reduxjs/toolkit";

import { getWordCheckThunk } from "../checkWord/checkWordThunks";

export const AttemptsSlice = createSlice({
  name: "attempt",
  initialState: {
    attempts: [],
    isLoading: false,
    isValid: false,
    error: null,
    overlay: null,
    winner: null,
  },
  reducers: {
    newAttempt(state, action) {
      if (state.attempts.length <= 6) {
        state.isLoading = false;
        state.isValid = false;
        state.error = null;

        console.log('adding attempt');
        state.attempts = [
          ...state.attempts, 
          {
            slots: Array.from({ length: action.payload }, (i) => ({
              slotId: Math.random(),
              letter: null,
              status: null,
            })),
            fullfied: false,
            submitted: false,
        }];
        
        console.log('added attempt');

        state.winner = state.attempts
          .map((attempt) => attempt.status)
          .every((attempt) => attempt === "in word");
      }
      if (state.winner) {
        state.overlay = "Has ganado";
      } else {
        state.overlay = "Has perdido";
      }
      
    },

    modifySlot(state, action) {
      let attemptToModify = null;
      state.attempts.forEach((attempt, i) => {
        attempt.slots.forEach((slot, i) => {
          if (slot.slotId === action.payload.slotId) {
            attemptToModify = attempt;
            if (attemptToModify.submitted) {
              return;
            }
            slot.letter = action.payload.letter;
            slot.status = action.payload.status || slot.status;
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

      const lastAttempt = getCurrentAttempt(state);
      action.payload.feedbacks.forEach((feedback) => {
        lastAttempt.slots[feedback.position].status = feedback.status;
      });
      lastAttempt.submitted = true;
    });
    builder.addCase(getWordCheckThunk.rejected, (state, action) => {
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
  return state.attempts[state.attempts.length - 1] || null;
};

export const lettersAndPositions = (attempt) => {
  const letterAndPosition = attempt.slots.map((slot, i) => {
    return [slot.letter, i];
  });
  return letterAndPosition;
};

export const { newAttempt, modifySlot, attempts, selected } =
  AttemptsSlice.actions;

export const firstEmptySlot = (state) => {
  console.log('getting first slot');
  return getCurrentAttempt(state)?.slots.find((slot) => !slot.letter);
};
