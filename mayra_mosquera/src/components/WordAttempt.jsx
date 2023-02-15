import { Slot } from "./Slot";

export const WordAttempt = ({onSelectSlot}) => {
  return (
    <>
      <div className="word">
        {Array.from({ length: 5 }).map((_, i) => (
          <Slot key={i} onSelect={onSelectSlot} slotId={Math.random()}/>
        ))}
      </div>
    </>
  );
};
