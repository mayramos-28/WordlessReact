import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkLettersWithGameId } from "../../../api/WordApi";

export const FeedbackThunk = createAsyncThunk(
  "feedback/guess",
  async ({ gameId, word }) => {
    console.log("word", word);
    const feedbacks = await Promise.all(
      word.split('').map(async (letter, position) => {
        const status = await checkLettersWithGameId(letter, position, gameId);
        return { position, status };
      })
    );
    return feedbacks;
  }
);
