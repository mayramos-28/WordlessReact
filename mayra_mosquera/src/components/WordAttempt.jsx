import { Slot } from "./Slot";

export const WordAttempt = ({data}) => {

  return (
    <>
      <div className="word">
        {data.slots.map((slotData, i) => (
          <Slot key={i} data={slotData} />
        ))}
      </div>
    </>
  );
};
