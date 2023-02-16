import { configureStore } from "@reduxjs/toolkit";
import { AttemptsSlice } from "./slices/attempt/AttemptsSlice";
import { PlayWordSlice } from "./slices/playWord";
import { SlotSelectedSlice } from "./slices/slots/SlotSelectedSlice";

export const store = configureStore({
  reducer: {
    playWord: PlayWordSlice.reducer,
    slotSelected:SlotSelectedSlice.reducer,
    attempts:AttemptsSlice.reducer,
    checkWord:PlayWordSlice.reducer,
  },
});
