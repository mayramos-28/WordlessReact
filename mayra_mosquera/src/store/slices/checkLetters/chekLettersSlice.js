import { createSlice } from "@reduxjs/toolkit";
import { FeedbackThunk } from "./checkLettersThunk";

export const  checkLettersSlice = createSlice({
   name: "feedback",
   initialState: {
       feedback: [],
          
   },
   reducers: {     



  },
  extraReducers: (builder) => {
       builder.addCase(FeedbackThunk.pending, (state, action) => {
         state.feedbackIsLoading = true;
       });
       builder.addCase(FeedbackThunk.fulfilled, (state, action) => {
         state.feedbackIsLoading = false;
         state.haveStatus = action.payload;       
      
          
       });
       builder.addCase(FeedbackThunk.rejected, (state, action) => {
         state.feedbackIsLoading = false;
         state.haveStatus = null;       
         state.feedbackError = action.error.message;
       });

   }        

});



export const {feedbackIsLoading, feedbackError, haveStatus } = checkLettersSlice.actions;
     