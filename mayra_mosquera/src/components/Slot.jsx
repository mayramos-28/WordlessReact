
import { useDispatch, useSelector } from "react-redux";

import { setSlotSelected } from "../store/slices/slots/SlotSelectedSlice";

export const Slot = ({ data }) => {
  const { slotId, letter, status, selected } = data;
  const dispatch = useDispatch();
  const { slotSelected } = useSelector((state) => state.slotSelected);

  const isSelected = () => {
    return slotSelected === slotId;
  };

  const color = () => {
    if (status === "in position") {
      return "green";
    } 
    if (status === "in word") {
      return "yellow";
    } 
    if (status === "wrong") {
      return "grey";
    } 
    return '';
  }


  return (
    <>
      <div
        className={`slot ${color()}  ${isSelected() ? "selected" : ""} ${selected}  `}
        onClick={() => dispatch(setSlotSelected(slotId))}               
      >
        {letter || ""}
        
      </div>
    </>
  );
};
