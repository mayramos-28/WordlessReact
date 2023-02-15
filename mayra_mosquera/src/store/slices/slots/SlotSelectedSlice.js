import { createSlice } from "@reduxjs/toolkit";

export const SlotSelectedSlice = createSlice({
  name: "slotSelected",
  initialState: {
    slotSelected: null,
  },
  reducers: {
    setSlotSelected(state, action) {
      console.log(state, action)
      state.slotSelected = action.payload;
    },
  },
});
export const { setSlotSelected } = SlotSelectedSlice.actions;