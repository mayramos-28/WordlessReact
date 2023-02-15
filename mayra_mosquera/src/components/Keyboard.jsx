import { useDispatch } from "react-redux";
import { pressKey } from "../store/slices/letters/keyboardSlice";
import { ReactComponent as BackSpaceSvg } from "./../assets/Logo.svg";

export const Keyboard = ({onKeyPress}) => {
  const dispatch = useDispatch();

  const keyboardLineKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["↵", "Z", "X", "C", "V", "B", "N", "M", "L", <BackSpaceSvg />],
  ];

  const keyValue = (key) => {
    if (key === "↵") {
      return "enter";
    }
    if (typeof key === "string") {
      return key;
    }
    return "backspace";
  };

  const isCommand = (key) => key === "↵" || typeof key !== "string";

  return (
    <>
      {keyboardLineKeys.map((keyboardLine, i) => {
        return (
          <div key={i} className="keyboard-line">
            {keyboardLine.map((key, j) => {
              return (
                <div
                  key={j}
                  className={isCommand(key) ? "command" : "key"}
                  onClick={() => !!onKeyPress && onKeyPress(keyValue(key))}
                >
                  {key}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
