import React, { useState } from "react";
import data from "./data";

const Bitcoin = () => {
  return (
    <div className="bitcoin">
      <div className="imgContainer">
        <img
          className="img"
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/bitcoin-icon.png"
        ></img>
        <h4 className="vs">VS</h4>
        <img
          className="img"
          src="https://www.flaticon.com/svg/vstatic/svg/2111/2111742.svg?token=exp=1618219927~hmac=14663d3afc7de46a4822c6c1e32f129c"
        ></img>
      </div>

      <h3 className="calcContainer">
        If you bought <h3 className="btc"> &ensp;$10,000 of bitcoin &ensp; </h3>{" "}
        instead of
        <h3 className="company"> &ensp; Uber's IPO &ensp; </h3>You would have an
        extra
        <h3 className="oppCost"> &ensp; $100,000 &ensp; </h3>
      </h3>
      <button className="btn">I'm an idiot</button>
    </div>
  );
};

export default Bitcoin;
