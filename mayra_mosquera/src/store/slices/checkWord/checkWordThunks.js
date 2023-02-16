import { createAsyncThunk } from "@reduxjs/toolkit";
import { isValidWordApi } from "../../../api/checkApi";

export const getWordCheckThunk = createAsyncThunk(
  "word/check",
  async (word) => {
    const isValid = await isValidWordApi(word);
    return isValid;
  }
);
