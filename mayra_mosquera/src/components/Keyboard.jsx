import React from "react";
import { useSelector } from "react-redux";
import { colorMap, letterStatus } from "../store/slices/attempt/AttemptsSlice";
import { ReactComponent as BackSpaceSvg } from "./../assets/Logo.svg";

export const Keyboard = ({ onPressLetter, onPressBackspace, onPressEnter }) => {

  const attemptsState = useSelector((state) => state.attempts);
  const letersStatus =  letterStatus(attemptsState);

  console.log('letersStatus',letersStatus, attemptsState);
  const backspace = <BackSpaceSvg />;
  const keyboardLineKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["↵", "Z", "X", "C", "V", "B", "N", "M", backspace],
  ];

  const isCommand = (key) => key === "↵" || typeof key !== "string";

  const onKeyPress = (key) => {
    if (key === "↵") {
      return onPressEnter();
    }

    if (key == backspace) {
      return onPressBackspace();
    }

    return onPressLetter(key);
  };

  return (
    <>
      <div className="keyboard">
        {keyboardLineKeys.map((keyboardLine, i) => {
          return (
            <div key={i} className="keyboard-line">
              {keyboardLine.map((key, j) => {
                return (
                  <div
                    key={j}
                    className={`${isCommand(key) ? "command" : "key"}  ${colorMap(letersStatus[key] || null)}`}
                    onClick={() => onKeyPress(key)}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
