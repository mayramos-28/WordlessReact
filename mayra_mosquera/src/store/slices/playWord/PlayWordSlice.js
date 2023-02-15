import { createSlice } from "@reduxjs/toolkit";
import { getWordPlayThunk } from "./PlayWordThunk";


export const PlayWordSlice = createSlice({
   name:'playWord',
   initialState : {
      playWord : null,
      isLoading:false,
      isRejected:false,
   },
   reducers:{
      startLoadingPlayWord:(state) => {
         state.isLoading = true;
      },
     
      setPlayWord:(state, action) =>{
         state.isLoading = false;
         state.playWord = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(getWordPlayThunk.pending, (state, action) => {
         state.isLoading = true;
       
      })
      builder.addCase(getWordPlayThunk.fulfilled, (state, action) => {
         state.isLoading = false;
        state.playWord = action.payload;
      })
      builder.addCase(getWordPlayThunk.rejected, (state, action) => {
         state.isLoading = false;
         state.isRejected= true;
        state.playWord = null;
      })
    },
});

export const {startLoadingPlayWord, setPlayWord} = PlayWordSlice.actions