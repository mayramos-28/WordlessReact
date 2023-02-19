import { WordAttempt } from "./WordAttempt";

export const Attempts = ({ attempts }) => {
  return (
    <>
      {attempts.map((attempt, index) => (
        <WordAttempt data={attempt} key={index} />
      ))}
    </>
  );
};
