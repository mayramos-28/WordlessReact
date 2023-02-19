import { createSlice } from "@reduxjs/toolkit";
import { getGameIdThunk } from "./gameIdThunk";


export const gameIdSlice = createSlice({
   name:'gameId',
   initialState : {
      gameId : null,
      isLoading:false,
      isFinished: false,
      gameResult: null,
      error:null,
   },
   reducers:{

      winGame(state){
         state.isFinished = true;
         state.gameResult = 'win';
      },
      lostGame(state){
         state.isFinished = true;
         state.gameResult = 'lose';
      }
   
},
   extraReducers: (builder) => {
      builder.addCase(getGameIdThunk.pending, (state) => {
         state.isLoading = true;
       
      })
      builder.addCase(getGameIdThunk.fulfilled, (state, action) => {
         state.isLoading = false;
        state.gameId= action.payload;
        state.error = null;
      })
      builder.addCase(getGameIdThunk.rejected, (state, action) => {
         state.isLoading = false;
         state.isRejected= true;
        state.gameId = null;
        state.error = action.error.message;
      })
    },
});

export const {winGame, lostGame} = gameIdSlice.actions