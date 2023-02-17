import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkLettersWithGameId, isValidWordApi } from "../../../api/WordApi";

export const getWordCheckThunk = createAsyncThunk(
  "word/check",
  async ({ gameId, word }) => {
    const isValid = await isValidWordApi(word);
    let feedbacks = [];
    if (isValid) {
      feedbacks = await Promise.all(
        word.split("").map(async (letter, position) => {
          const status = await checkLettersWithGameId(letter, position, gameId);
          return { position, status };
        })
      );
    }
    return { isValid, feedbacks };
  }
);
