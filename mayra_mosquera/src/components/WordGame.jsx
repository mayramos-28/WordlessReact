import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  attemptIsWinner,
  firstEmptySlot,
  getLatestAttempt,
  getSlot,
  getWordFromAttempt,
  lastWrittedSlot,
  modifySlot,
  newAttempt,
  slotIsEmpty,
} from "../store/slices/attempt/AttemptsSlice";

import { getWordCheckThunk } from "../store/slices/checkWord/checkWordThunks";
import { getGameIdThunk, lostGame, winGame } from "../store/slices/gameId";
import { setSlotIdSelected } from "../store/slices/slots/SlotSelectedSlice";
import { Attempts } from "./Attempts";
import { Game } from "./Game";
import { Keyboard } from "./Keyboard";
import { Loading } from "./subComponents/Loading";

const finishGameMessage = (gameResult) => {
  return (
    (gameResult === "win" && "Has ganado") ||
    (gameResult === "lose" && "Has perdido")
  );
};

export const WordGame = () => {
  const wordLength = 5;
  const maxAttempts = 6;
  const dispatch = useDispatch();
  const attemptsState = useSelector((state) => state.attempts, shallowEqual);
  const currentAttempt = useSelector((state) =>
    getLatestAttempt(state.attempts)
  );
  const { slotIdSelected } = useSelector((state) => state.slotSelected);
  const fistEmptySlot = useSelector((state) => firstEmptySlot(state.attempts));
  const {
    isLoading,
    error: gameError,
    gameId,
    isFinished,
    gameResult,
  } = useSelector((state) => state.gameId);
  const firstExecution = useRef(true);
  const conditionLoading = isLoading || attemptsState.isLoading;
  const currentAttemptIsSubmitted = currentAttempt?.submitted;

  useEffect(() => {
    if (firstExecution.current) {
      dispatch(getGameIdThunk());
      dispatch(newAttempt(wordLength));
      firstExecution.current = false;
    }
  }, [dispatch, firstExecution, attemptsState]);

  useEffect(() => {
    dispatch(setSlotIdSelected(firstEmptySlot(attemptsState)?.slotId));
  }, [dispatch, attemptsState]);

  useEffect(() => {
    dispatch(setSlotIdSelected(fistEmptySlot?.slotId));
  }, [dispatch, fistEmptySlot]);

  useEffect(() => {
    if (!currentAttemptIsSubmitted || isFinished) {
      return;
    }
    if (attemptIsWinner(currentAttempt)) {
      dispatch(winGame());
      return;
    }
    const numberOfAttempts = attemptsState.attempts.length;
    if (numberOfAttempts === maxAttempts) {
      dispatch(lostGame());
      return;
    }
    dispatch(newAttempt(wordLength));
  }, [dispatch, currentAttemptIsSubmitted, gameId]);

  const writteSlot = (key) =>
    dispatch(modifySlot({ slotId: slotIdSelected, letter: key }));

  const deleteSlot = () => {
    let slot = getSlot(attemptsState, slotIdSelected);

    if (slotIsEmpty(slot)) {
      slot = lastWrittedSlot(attemptsState);
    }

    if (slot) {
      dispatch(modifySlot({ slotId: slot.slotId, letter: "" }));
    }
  };

  const submitAttempt = () => {
    const latestAttempt = getLatestAttempt(attemptsState);
    const wordFromCurrentAttempt = getWordFromAttempt(latestAttempt);
    dispatch(
      getWordCheckThunk({ gameId: gameId, word: wordFromCurrentAttempt })
    );
  };

  return (
    <Game
      title="Adivina la palabra"
      overlayMessage={ gameError || finishGameMessage(gameResult)}
      error={attemptsState.error}
    >
      <div className="words">
        {conditionLoading && <Loading />}
        <div className="container">
          <Attempts attempts={attemptsState.attempts} />
        </div>
      </div>
      <Keyboard
        onPressLetter={(key) => conditionLoading || writteSlot(key)}
        onPressEnter={() => conditionLoading || submitAttempt()}
        onPressBackspace={() => conditionLoading || deleteSlot()}
      />
    </Game>
  );
};
