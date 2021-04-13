import React, { useState } from "react";
import data from "./data";

const Bitcoin = () => {
  const [dataIndex, setDataIndex] = useState(0);
  const {
    id,
    company,
    image,
    ipoDate,
    ipoPrice,
    btcClosingPriceOnIpoDate,
    currentDate,
    companyCurrentPrice,
    btcCurrentPrice,
  } = data[dataIndex];

  const randomCompany = () => {
    let randomNumber = Math.floor(Math.random() * data.length); // Generates random number between 0 to data array length minus one;
    setDataIndex(randomNumber);
  };

  return (
    <div className="bitcoin">
      <div className="imgContainer">
        <img
          className="img"
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/bitcoin-icon.png"
        ></img>
        <h4 className="vs">VS</h4>
        <img className="img" src={image}></img>
      </div>

      <h3 className="calcContainer">
        If you bought <h3 className="btc"> &ensp;$10,000 of bitcoin &ensp; </h3>{" "}
        instead of
        <h3 className="company"> &ensp; {company}'s IPO &ensp; </h3>You would
        have an extra
        <h3 className="oppCost"> &ensp; $100, 000 &ensp; </h3>
      </h3>
      <button className="btn" onClick={randomCompany}>
        I'm an idiot
      </button>
    </div>
  );
};

export default Bitcoin;
