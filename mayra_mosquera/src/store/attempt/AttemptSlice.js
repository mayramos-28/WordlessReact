import { createSlice } from "@reduxjs/toolkit";

export const AttemptSlice = createSlice({
  name: "attempt",
  initialState: {
    attempt: null,
    attemptOccurredOn: null,
  },
  reducers: {
    setAttempt(state, action) {
      state.attempt = action.payload;
      state.attemptOccurredOn = Date.now();
    },
  },
});
export const { setAttempt } = AttemptSlice.actions;