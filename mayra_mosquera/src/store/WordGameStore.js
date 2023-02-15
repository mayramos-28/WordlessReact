import { configureStore } from "@reduxjs/toolkit";
import { KeyboardSlice } from "./slices/letters/keyboardSlice";
import { PlayWordSlice } from "./slices/playWord";
import { SlotSelectedSlice } from "./slices/slots/SlotSelectedSlice";
//import { WordSlice } from "./slices/words/WordSlice";

// import { pokemonSlice } from './slices/pokemon';

export const store = configureStore({
  reducer: {
   //  word: WordSlice.reducer,
    playWord: PlayWordSlice.reducer,
    slotSelected:SlotSelectedSlice.reducer,
    // keyboard:KeyboardSlice.reducer  
  },
});
