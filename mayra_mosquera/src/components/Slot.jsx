import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorMap } from "../store/slices/attempt/AttemptsSlice";
import { setSlotIdSelected } from "../store/slices/slots/SlotSelectedSlice";


export const Slot = ({ data }) => {
  const { slotId, letter, status } = data;
  const dispatch = useDispatch();
  const { slotIdSelected } = useSelector((state) => state.slotSelected);

  const isSelected = () =>  slotIdSelected === slotId;

  return (
    <>
      <div className="letter">
        <div
          className={`slot ${colorMap(status)}  ${isSelected() ? "selected" : ""} `}
          onClick={() => dispatch(setSlotIdSelected(slotId))}
        >
          {letter || ""}
        </div>
      </div>
    </>
  );
};
