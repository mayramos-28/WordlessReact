import { Keyboard } from "./Keyboard";
import { WordAttempt } from "./WordAttempt";
import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getWordPlayThunk } from "../store/slices/playWord";

import {
  firstEmptySlot,
  getCurrentAttempt as getlatestAttempt,
  getWordFromAttempt,
  modifySlot,
  newAttempt,
} from "../store/slices/attempt/AttemptsSlice";

import { getWordCheckThunk } from "../store/slices/checkWord/checkWordThunks";
import { Loading } from "./subComponents/Loading";
import { Errors } from "./subComponents/Errors";
import { Overlay } from "./subComponents/Overlay";
import { setSlotSelected } from "../store/slices/slots/SlotSelectedSlice";

export const WordGame = (props) => {
  const wordLength = 5;
  const dispatch = useDispatch();
  const attemptsState = useSelector((state) => state.attempts, shallowEqual);
  const { slotSelected } = useSelector((state) => state.slotSelected);
  const { isLoading, error, playWord } = useSelector((state) => state.playWord);
  const firstExecution = useRef(true);
  const conditionLoading = isLoading || attemptsState.isLoading;

  useEffect(() => {
    if (firstExecution.current) {
      console.log("use effect first execution word game");
      dispatch(getWordPlayThunk());
      (async() => {
        console.log('dispatch new attempt')
        await dispatch(newAttempt(wordLength));      
        setTimeout(() => {
          console.log('attempts state after dispatch new attempt', attemptsState);
        }, 1000);

        console.log('dispatch select slot')
        await dispatch(setSlotSelected(firstEmptySlot(attemptsState)?.slotId));
      })();
      firstExecution.current = false;
    }
    console.log('jeje', attemptsState);
  }, [dispatch, firstExecution, attemptsState]);

  useEffect(() => {
    console.log("use effect word game 2");
    const latestAttempt = getlatestAttempt(attemptsState);
    if (latestAttempt?.submitted) {
      dispatch(newAttempt(wordLength));
    }
  }, [dispatch, attemptsState, playWord]);

  const onKeyPress = async (key) => {
    if (conditionLoading) {
      return;
    }
    if (key === "enter") {
      const latestAttempt = getlatestAttempt(attemptsState);
      const wordFromCurrentAttempt = getWordFromAttempt(latestAttempt);
      dispatch(getWordCheckThunk({gameId: playWord, word: wordFromCurrentAttempt}));

      return;
    }

    await dispatch(
      modifySlot({
        slotId: slotSelected,
        letter: key === "backspace" ? "" : key,
      })
    );
   await dispatch(setSlotSelected(firstEmptySlot(attemptsState)?.slotId));
  };

  return (
    <div className="game">
      <div className="board">
        <h1>Adivina la palabra</h1>

        {error ? <Overlay message={error} /> : " "}

        <div className="words">
          <div className="container">
            {conditionLoading ? <Loading /> : ""}

            {attemptsState.attempts.map((attempt, index) => (
              <WordAttempt data={attempt} key={index} />
            ))}
          </div>
        </div>

        <Keyboard onKeyPress={onKeyPress} disabled={conditionLoading} />
      </div>

      {attemptsState.error && <Errors message={attemptsState.error} />}
    </div>
  );
};
