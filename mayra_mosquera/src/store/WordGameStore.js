import { configureStore } from "@reduxjs/toolkit";
import { AttemptsSlice } from "./slices/attempt/AttemptsSlice";
import { gameIdSlice } from "./slices/gameId/gameIdSlice";
import { SlotSelectedSlice } from "./slices/slots/SlotSelectedSlice";

export const store = configureStore({
  reducer: {
    gameId:gameIdSlice.reducer,    
    slotSelected:SlotSelectedSlice.reducer,
    attempts:AttemptsSlice.reducer,
    checkWord:gameIdSlice.reducer,    
   
  },
});
