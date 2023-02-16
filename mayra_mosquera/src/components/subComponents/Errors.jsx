export const Errors = ({ error }) => {
  return (
    <>
      <div className="error">
        <div className="overlay"></div>
        <div>{error} </div>
      </div>
    </>
  );
};
