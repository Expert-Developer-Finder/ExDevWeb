import React from "react";
import Lottie from "react-lottie";
import animation from "../assets/loader.json"
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
  };

return <Lottie options={defaultOptions} height={500} width={500}/>;
};

export default Loader;
