import { useDispatch, useSelector } from "react-redux";
import { setSlotSelected } from "../store/slices/slots/SlotSelectedSlice";
import { store } from "../store/WordGameStore";

export const Slot = ({ slotId, onSelect }) => {
  const dispatch = useDispatch();
  const { slotSelected } = useSelector((state) => state.slotSelected);
  let letter = null;

  let lastKeyPressedOccurredOn = null;

  store.subscribe(() => {
    const { keyPressed, keyPressedOccurredOn } = store.getState().keyboard;
    if (lastKeyPressedOccurredOn !== keyPressedOccurredOn) {
      lastKeyPressedOccurredOn = keyPressedOccurredOn;

      if (isSelected()) {
        letter = keyPressed;
      }
    }
  });

  const isSelected = () => {
    return slotSelected === slotId;
  };

  return (
    <>
      <div
        className={`slot ${isSelected() ? "selected" : ""}`}
        onClick={(e) => dispatch(setSlotSelected(slotId))}
      >
        {letter || ""}
      </div>
    </>
  );
};
