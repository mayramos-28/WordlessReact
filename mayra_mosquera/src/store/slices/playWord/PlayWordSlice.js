import { createSlice } from "@reduxjs/toolkit";
import { getWordPlayThunk } from "./PlayWordThunk";


export const PlayWordSlice = createSlice({
   name:'playWord',
   initialState : {
      playWord : null,
      isLoading:false,
      error:null,
   },
   reducers:{
   //    startLoadingPlayWord:(state) => {
   //       state.isLoading = true;
   //    },
     
   //    setPlayWord:(state, action) =>{
   //       state.isLoading = false;
   //       state.playWord = action.payload;
   //    }
},
   extraReducers: (builder) => {
      builder.addCase(getWordPlayThunk.pending, (state, action) => {
         state.isLoading = true;
       
      })
      builder.addCase(getWordPlayThunk.fulfilled, (state, action) => {
         state.isLoading = false;
        state.playWord = action.payload;
        state.error = null;
      })
      builder.addCase(getWordPlayThunk.rejected, (state, action) => {
         state.isLoading = false;
         state.isRejected= true;
        state.playWord = null;
        state.error = action.error.message;
      })
    },
});

export const {startLoadingPlayWord, setPlayWord} = PlayWordSlice.actions