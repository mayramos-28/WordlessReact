export const Errors = ({ message }) => {
  return (
    <>
      <div className="error">
        <div className="overlay"></div>
        <div>{message} </div>
      </div>
    </>
  );
};
