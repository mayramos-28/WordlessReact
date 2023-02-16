import { createSlice } from "@reduxjs/toolkit";


export const CheckWordSlice = createSlice({     
   name:'checkWord',       
   initialState : {  
      checkWord : null,
      checkWordIsLoading:false,
      checkWordIsRejected:false,
   },
   reducers:{  
      startLoadingCheckWord:(state) => {
         state.checkWordIsLoading = true;
      },
      getCheckword:(state, action) =>{
        state.checkWord = action.payload.letter.map((slot) => slot.letter).join("");
      }
   },          

   // extraReducers: (builder) => {    

   //    builder.addCase(getWordCheckThunk.pending, (state, action) => {
   //       state.checkWordIsLoading = true;
   //    })
   //    builder.addCase(getWordCheckThunk.fulfilled, (state, action) => {
   //       state.checkWordIsLoading = false;
   //       state.checkWord = action.payload;
   //    })
   //    builder.addCase(getWordCheckThunk.rejected, (state, action) => {
   //       state.checkWordIsLoading = false;
   //       state.checkWordIsRejected= true;
   //       state.checkWord = null;
   //    })
   //  },

});


export const { checkWord, startLoadingCheckWord, getCheckword, checkWordIsLoading, checkWordIsRejected} = CheckWordSlice.actions