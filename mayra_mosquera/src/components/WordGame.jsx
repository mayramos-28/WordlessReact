import { Keyboard } from "./Keyboard";
import { WordAttempt } from "./WordAttempt";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWordPlayThunk } from "../store/slices/playWord";
import { ReactComponent as Loader } from "./../assets/loadingIcon.svg";

export const WordGame = (props) => {
  const dispatch = useDispatch();

  const { isLoading, isRejected } = useSelector((state) => state.playWord);
  useEffect(() => {
    dispatch(getWordPlayThunk());
  }, []);


  const onKeyPress = (key) => {
    console.log(key);
  };
  // const error = '<div className="game"> <div className="message">Error initializing game : 404 </div> </div>'

  return (
    <div className="game">
      <div className="board">
        <h1>Adivina la palabra</h1>
        {isRejected ? (
          <div className="game">
            {" "}
            <div className="message">Error initializing game : 404 </div>{" "}
          </div>
        ) : (
          ""
        )}

        <div className="words">
          <div className="container">
            {isLoading ? (
              <div className="loading">
                {" "}
                <Loader />{" "}
              </div>
            ) : (
              ""
            )}
            <WordAttempt />
          </div>
        </div>
        <div disabled={isLoading} className="keyboard">
          <Keyboard onKeyPress={onKeyPress}/>
        </div>
      </div>
    </div>
  );
};
