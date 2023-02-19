import { createSlice } from "@reduxjs/toolkit";

export const SlotSelectedSlice = createSlice({
  name: "slotSelected",
  initialState: {
    slotIdSelected: null,
  },
  reducers: {
    setSlotIdSelected(state, action) {     
        state.slotIdSelected = action.payload;
    },
  },
});
export const { setSlotIdSelected } = SlotSelectedSlice.actions;
