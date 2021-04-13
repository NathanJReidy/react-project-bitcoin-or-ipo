import React, { useState } from "react";
import data from "./data";

const Bitcoin = ({ initialInvestment }) => {
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

  // Remove commas from initial investment and turn it into a number
  const formattedInitialInvestment = parseFloat(
    initialInvestment.replace(/,/g, "")
  );
  const shares = formattedInitialInvestment / ipoPrice;
  const btc = formattedInitialInvestment / btcClosingPriceOnIpoDate;
  const currentSharesValue = shares * companyCurrentPrice;
  const currentBtcValue = btc * btcCurrentPrice;
  const oppCost = currentBtcValue - currentSharesValue;

  const calcOppCost = () => {
    return Number(oppCost.toFixed(2)).toLocaleString("en-US");
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
        If you bought{" "}
        <h3 className="btc"> &ensp;${initialInvestment} of bitcoin &ensp; </h3>{" "}
        instead of
        <h3 className="company"> &ensp; {company}'s IPO &ensp; </h3>You would
        have an extra
        <h3 className="oppCost"> &ensp; ${calcOppCost()} &ensp; </h3>
      </h3>
      <h4 className="ipoDate">
        {company}'s IPO Date: {ipoDate}
      </h4>
      <h4 className="btcPriceIpoDate">
        You could have bought {btc.toFixed(2)} btc at $
        {btcClosingPriceOnIpoDate} USD!
      </h4>
      <button className="btn" onClick={randomCompany}>
        I'm an idiot
      </button>
    </div>
  );
};

export default Bitcoin;
