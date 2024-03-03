import React from "react";
import SpinnerGIF from "../../assets/loading.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGIF}
        className="d-block m-auto"
        style={{ width: "50px" }}
        alt="Spinner"
      />
    </>
  );
};

export default Spinner;
