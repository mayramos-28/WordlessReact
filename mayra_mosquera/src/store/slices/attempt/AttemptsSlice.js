import { createSlice } from "@reduxjs/toolkit";
import { getWordCheckThunk } from "../checkWord/checkWordThunks";

export const getLatestAttempt = (state) => {
  return state.attempts[state.attempts.length - 1] || null;
};
export const slotIsEmpty = (slot) => !slot?.letter;

export const getSlot = (state, slotId) => {
  for (let attempt of state.attempts) {
    for (let slot of attempt.slots) {
      if (slot.slotId === slotId) {
        return slot;
      }
    }
  }
  return null;
};

export const firstEmptySlot = (state) => {
  return getLatestAttempt(state)?.slots.find(slotIsEmpty);
};
export const lastWrittedSlot = (state) => {
  return [...(getLatestAttempt(state)?.slots || [])]
    .reverse()
    .find((slot) => slot?.letter);
};

export const getWordFromAttempt = (attempt) => {
  return attempt.slots.map((slot) => slot.letter || " ").join("");
};

export const colorMap = (status) => {
  if (status === "in position") {
    return "green";
  }
  if (status === "in word") {
    return "yellow";
  }
  if (status === "wrong") {
    return "grey";
  }
  return "";
};

const prioritaryStatus = (statusArray) => {
  return statusArray.find((status) => status == "in position")
   || statusArray.find((status) => status == "in word")
   || statusArray.find((status) => status == "wrong");
};

export const letterStatus = (state) => {
  const slots = state.attempts.flatMap((attempt) => attempt.slots);
 
  return slots.reduce((object, slot) => {
    if(slotIsEmpty(slot) || !slot.status) {
      return object;
    }

    const objectStatus = object[slot.letter] || null;
    const slotStatus = slot.status;

    return {
      ...object, 
      [slot.letter]: prioritaryStatus([objectStatus, slotStatus])
    };

  }, {});
};

export const attemptIsWinner = (attempt) => {
  return attempt.slots.every((slot) => slot.status === "in position");
}

export const AttemptsSlice = createSlice({
  name: "attempt",
  initialState: {
    attempts: [],
    slotSelected: null,
    isLoading: false,
    isValid: false,
    error: null,
    overlay: null,
  },
  reducers: {
    newAttempt(state, action) {       
        state.isLoading = false;
        state.isValid = false;
        state.error = null;

        state.attempts = [
          ...state.attempts,
          {
            slots: Array.from({ length: action.payload }, (_, i) => ({
              slotId: Math.random(),
              letter: null,
              status: null,
              position: i,
            })),
            fullfied: false,
            submitted: false,
          },
        ];
        state.overlay = null;
    },

    modifySlot(state, action) {
      let attemptToModify = null;
      state.attempts.forEach((attempt) => {
        attempt.slots.forEach((slot) => {
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
    builder.addCase(getWordCheckThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWordCheckThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isValid = action.payload;
      state.error = null;

      const lastAttempt = getLatestAttempt(state);
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

export const { newAttempt, modifySlot, attempts, setSlotSelected } =
  AttemptsSlice.actions;
