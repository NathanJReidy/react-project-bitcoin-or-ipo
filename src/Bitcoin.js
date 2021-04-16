import React, { useState } from "react";
import data from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import "../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

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

  const checkNumber = (newIndex) => {
    if (newIndex > data.length - 1) {
      return 0;
    } else if (newIndex < 0) {
      return data.length - 1;
    } else {
      return newIndex;
    }
  };

  const nextCompany = () => {
    setDataIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevCompany = () => {
    setDataIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  // Returns a random index (changes the company shown when btn is clicked)
  const randomCompany = () => {
    let randomNumber = Math.floor(Math.random() * data.length); // Generates random number between 0 to data array length minus one;
    // Ensure random number isn't the same as the existing index
    if (randomNumber === dataIndex) {
      randomNumber = dataIndex + 1;
    }
    setDataIndex(checkNumber(randomNumber));
  };

  // Remove commas from initial investment and turn it into a number
  const formattedInitialInvestment = parseFloat(
    initialInvestment.replace(/,/g, "")
  );
  const shares = formattedInitialInvestment / ipoPrice;
  const btc = formattedInitialInvestment / btcClosingPriceOnIpoDate;
  const currentSharesValue = shares * companyCurrentPrice;
  const currentBtcValue = btc * btcCurrentPrice;
  console.log(`currentSharesValue is ${currentSharesValue}`);
  console.log(`currentBtcValue is ${currentBtcValue}`);
  const oppCost = currentBtcValue - currentSharesValue;
  console.log(`oppCost is ${oppCost}`);
  const medianPersonalIncome2019USA = 35977;
  const oppTime = oppCost / medianPersonalIncome2019USA;

  const columnChartData = [
    { x: company, y: currentSharesValue, color: "red" },
    { x: "BTC", y: currentBtcValue, color: "orange" },
    { x: "Opp. Cost", y: oppCost, color: "green" },
  ];

  //   const labelledColumnChartData = [
  //     {
  //       x: 0,
  //       y: 700,
  //       label: currentSharesValue.toFixed(2).toLocaleString("en-US"),
  //       style: { fontSize: 10 },
  //       rotation: -90,
  //     },
  //     {
  //       x: 1,
  //       y: 5,
  //       label: currentBtcValue.toFixed(2).toLocaleString("en-US"),
  //       style: { fontSize: 10 },
  //       rotation: -90,
  //     },
  //     {
  //       x: 0,
  //       y: 10,
  //       label: oppCost.toFixed(2).toLocaleString("en-US"),
  //       style: { fontSize: 10 },
  //       rotation: -90,
  //     },
  //   ];

  const calcOppCost = () => {
    return Number(oppCost.toFixed(2)).toLocaleString("en-US");
  };

  // The MP3 file is being stored in Google Drive as a shareable link with anyone. I then took the ID only from that
  // shareable link and put it into the format below where everything after "id=" is the relevant ID for the audio
  const sound = new Audio(
    "https://docs.google.com/uc?export=download&id=13eKa0XAgOn7mATB39bPIg5buNwvcaz2F"
  );

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
        <span className="span">If you bought</span>
        <span className="btc">
          &ensp;${initialInvestment} of bitcoin &ensp;{" "}
        </span>{" "}
        <span className="span">instead of</span>
        <span className="company"> &ensp; {company}'s IPO &ensp; </span>
        <span className="span">You would have gained an extra</span>
        <span className="oppCost"> &ensp; ${calcOppCost()} &ensp; </span>
        <span className="span">& saved</span>
        <span className="oppTime">&ensp; {oppTime.toFixed(1)} years</span>
        <span className="span">
          of your life that you would have otherwise worked
        </span>
      </h3>

      <XYPlot
        height={250}
        width={250}
        margin={{ left: 70 }}
        colorType="literal"
        xType="ordinal"
      >
        {/* <VerticalGridLines /> */}
        <HorizontalGridLines />
        <XAxis />
        <YAxis tickLabelAngle={-45} />
        <VerticalBarSeries data={columnChartData} />
        {/* <LabelSeries data={labelledColumnChartData} /> */}
        <LabelSeries
          data={columnChartData.map((obj) => {
            return {
              ...obj,
              label: Number(obj.y.toFixed(2)).toLocaleString("en-US"),
            };
          })}
          style={{ fontSize: 8 }}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
      </XYPlot>

      <h4 className="ipoDate">
        {company}'s IPO Date: {ipoDate}
      </h4>
      <h4 className="btcPriceIpoDate">
        You could have bought {btc.toFixed(2)} btc at $
        {btcClosingPriceOnIpoDate} USD each!
      </h4>
      <div className="btnContainer">
        <FaChevronLeft className="previousIcon" onClick={prevCompany} />
        <FaChevronRight className="nextIcon" onClick={nextCompany} />
      </div>
      <button
        className="btn"
        onClick={() => {
          randomCompany();
          sound.play();
        }}
      >
        I'm an idiot
      </button>
    </div>
  );
};

export default Bitcoin;
