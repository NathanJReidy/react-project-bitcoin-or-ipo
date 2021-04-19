import React, { useState, useEffect } from "react";
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

const Bitcoin = ({ initialInvestment, annualIncome, btcCurrentPriceNew }) => {
  const [dataIndex, setDataIndex] = useState(0);
  const {
    id,
    company,
    symbol,
    image,
    ipoDate,
    ipoPrice,
    btcClosingPriceOnIpoDate,
    defaultDate,
    defaultCompanyPrice,
  } = data[dataIndex];

  const [currentCompanyClosingPrice, setCurrentCompanyClosingPrice] = useState(
    defaultCompanyPrice
  );
  const [isLoading, setIsLoading] = useState(true);

  const companyApi = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=HS5TVS0YI1MOIRX6`;

  console.log(`symbol is ${symbol}`);
  console.log(companyApi);

  // Fetch latest company closing price from API
  const fetchCompanyPrice = async () => {
    setIsLoading(true);
    try {
      console.log("try");
      console.log(companyApi);
      const companyResponse = await fetch(companyApi);
      const companyJson = await companyResponse.json();
      setIsLoading(false);
      // Remove commas and turn it into a number
      const closingPrice = parseFloat(
        companyJson["Global Quote"]["08. previous close"].replace(/,/g, "")
      );
      console.log(`closing price is ${closingPrice}`);
      setCurrentCompanyClosingPrice(closingPrice);
    } catch (error) {
      setIsLoading(false);
      console.log(`the error is: ${error}`);
    }
  };

  // Ensures chosen data index is within length of array
  const checkNumber = (newIndex) => {
    if (newIndex > data.length - 1) {
      return 0;
    } else if (newIndex < 0) {
      return data.length - 1;
    } else {
      return newIndex;
    }
  };

  // Changes data index to next company
  const nextCompany = () => {
    setDataIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  // Changes data index to previous company
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
  // Remove commas from annual income and turn it into a number
  const formattedAnnualIncome = parseFloat(annualIncome.replace(/,/g, ""));
  const shares = formattedInitialInvestment / ipoPrice;
  const btc = formattedInitialInvestment / btcClosingPriceOnIpoDate;
  const currentSharesValue = shares * currentCompanyClosingPrice;
  console.log(`currentCompanyClosingPrice is ${currentCompanyClosingPrice}`);
  const currentBtcValue = btc * btcCurrentPriceNew;
  const oppCost = currentBtcValue - currentSharesValue;
  const oppTime = (oppCost / formattedAnnualIncome).toFixed(1);
  const oppTimeYears = oppTime.toString().split(".")[0];
  const oppTimeMonths = Math.floor(
    Number("0." + oppTime.toString().split(".")[1]) * 12
  );

  // Store data for column graph
  const columnChartData = [
    { x: company, y: currentSharesValue, color: "red" },
    { x: "BTC", y: currentBtcValue, color: "orange" },
    { x: "Opp. Cost", y: oppCost, color: "green" },
  ];

  // Rounds opportunity cost to nearest 2 decimal places and turns it into a string with commas
  const calcOppCost = () => {
    return Number(oppCost.toFixed(2)).toLocaleString("en-US");
  };

  // The MP3 file is being stored in Google Drive as a shareable link with anyone. I then took the ID only from that
  // shareable link and put it into the format below where everything after "id=" is the relevant ID for the audio
  const sound = new Audio(
    "https://docs.google.com/uc?export=download&id=13eKa0XAgOn7mATB39bPIg5buNwvcaz2F"
  );

  // Returns correct grammar based on number of months/years
  const formatYearMonth = () => {
    if (oppTimeYears == 0 && oppTimeMonths != 1) {
      return `${oppTimeMonths} months`; // e.g. 2 months, 0 months
    } else if (oppTimeMonths == 0 && oppTimeYears != 0 && oppTimeYears != 1) {
      return `${oppTimeYears} years`; // e.g. 2 years,
    } else if (oppTimeMonths == 0 && oppTimeYears != 0 && oppTimeYears == 1) {
      return `${oppTimeYears} year`; // e.g. 1 year
    } else if (oppTimeYears == 0 && oppTimeMonths == 1) {
      return `${oppTimeMonths} month`; // e.g. 1 month
    } else if (oppTimeYears == 1 && oppTimeMonths == 1) {
      return `${oppTimeYears} year & ${oppTimeMonths} month`;
    } else if (oppTimeYears == 1 && oppTimeMonths > 1) {
      return `${oppTimeYears} year & ${oppTimeMonths} months`;
    } else if (oppTimeYears > 1 && oppTimeMonths == 1) {
      return `${oppTimeYears} years & ${oppTimeMonths} month`;
    } else if (oppTimeYears > 1 && oppTimeMonths > 1) {
      return `${oppTimeYears} years & ${oppTimeMonths} months`;
    }
  };

  // Automatically scrolls user down to the bitcoin calculations component
  const executeScroll = () => {
    window.scrollTo({ behavior: "smooth", top: 200 });
  };

  // Fetch the company's current closing price
  useEffect(() => {
    fetchCompanyPrice();
  }, [dataIndex]);

  useEffect(() => {
    executeScroll();
  }, [isLoading]);

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

      {isLoading ? null : (
        <>
          <h3 className="calcContainer">
            <span className="span">If you bought</span>
            <span className="btc">
              &ensp;${initialInvestment} of bitcoin &ensp;{" "}
            </span>{" "}
            <span className="span">instead of</span>
            <span className="company"> &ensp; {company}'s IPO &ensp; </span>
            <span className="span">You would have gained an extra</span>
            <span className="oppCost"> &ensp; ${calcOppCost()} &ensp; </span>
            {annualIncome != 0 ? (
              <>
                <span className="span">& saved &ensp;</span>
                <span className="oppTime">{formatYearMonth()}</span>
                <span className="span">&ensp; of your life spent working</span>
              </>
            ) : null}
          </h3>
          <XYPlot
            height={200}
            width={250}
            margin={{ left: 70 }}
            colorType="literal"
            xType="ordinal"
            className="xyPlot"
          >
            <HorizontalGridLines />
            <XAxis />
            <YAxis tickLabelAngle={-45} />
            <VerticalBarSeries data={columnChartData} />
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
        </>
      )}
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
