import { Errors } from "./subComponents/Errors";
import { Overlay } from "./subComponents/Overlay";

export const Game = (props) => {
  const { title, overlayMessage, error } = props;
  return (
    <>
      <div className="game">
        <div className="board">
          <h1>{title}</h1>
          {overlayMessage && <Overlay message={overlayMessage} />}
          {props.children}
          {error && <Errors message={error} />}
        </div>
        
      </div>
    </>
  );
};
