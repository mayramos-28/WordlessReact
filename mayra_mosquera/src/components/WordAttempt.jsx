
import { Slot } from "./Slot";

export const WordAttempt = ({data}) => {

   // const letters= data.slots.map((slotData) => { return slotData.letter} );

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
