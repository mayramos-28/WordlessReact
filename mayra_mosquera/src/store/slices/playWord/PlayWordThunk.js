import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomWord } from "../../../api/WordApi";

export const getWordPlayThunk = createAsyncThunk(
  "word/new", 
  async () => {
  const word = await getRandomWord();
  return word;
});
