import { useDispatch, useSelector } from "react-redux";
import { setSlotSelected } from "../store/slices/slots/SlotSelectedSlice";

export const Slot = ({ data }) => {
  const { slotId, letter, color } = data;
  const dispatch = useDispatch();
  const { slotSelected } = useSelector((state) => state.slotSelected);

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
