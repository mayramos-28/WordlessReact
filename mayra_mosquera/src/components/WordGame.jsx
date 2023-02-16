import { Keyboard } from "./Keyboard";
import { WordAttempt } from "./WordAttempt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWordPlayThunk } from "../store/slices/playWord";


import {
  getCurrentAttempt as getlatestAttempt,
  getWordFromAttempt,
  modifySlot,
  newAttempt,
} from "../store/slices/attempt/AttemptsSlice";
import { getWordCheckThunk } from "../store/slices/checkWord/checkWordThunks";
import { Loading } from "./subComponents/Loading";
import { Errors } from "./subComponents/Errors";
import { AdviseGame } from "./subComponents/advise";

export const WordGame = (props) => {
  const dispatch = useDispatch();

  const attemptsState = useSelector((state) => state.attempts);
  const { slotSelected } = useSelector((state) => state.slotSelected);
  const { isLoading, error } = useSelector((state) => state.playWord);
  



  let firstExecution = true;
  useEffect(() => {
    console.log("use effect word game");
    if (firstExecution) {
      console.log("use effect first execution word game");
      dispatch(getWordPlayThunk());
      dispatch(newAttempt(5));
    }
    firstExecution = false;
  }, []);

  const onKeyPress = (key) => {
    if (key === "enter") {
      const latestAttempt = getlatestAttempt(attemptsState);
      const wordFromCurrentAttempt = getWordFromAttempt(latestAttempt);
      dispatch(getWordCheckThunk(wordFromCurrentAttempt));
      return;
    }

    dispatch(
      modifySlot({
        slotId: slotSelected,
        letter: key === "backspace" ? "" : key,
      })
    );
  };



  const conditionLoading = isLoading || attemptsState.isLoading;

 


  return (
    <div className="game">
      <div className="board">
        <h1>Adivina la palabra</h1>
        {error ? <AdviseGame advise={error} /> : ""}

        <div className="words">
          <div className="container">
            {conditionLoading ? <Loading /> : ""}

            {attemptsState.attempts.map((attempt, index) => (
              <WordAttempt data={attempt} key={index} />
            ))}
          </div>
        </div>
        <div disabled={conditionLoading} className="keyboard">
          <Keyboard onKeyPress={onKeyPress} />
        </div>
      </div>
      
      { attemptsState.error && <Errors error={attemptsState.error} /> }
    </div>
  );
};
