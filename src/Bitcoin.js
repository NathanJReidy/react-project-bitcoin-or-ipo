import React, { useState, useEffect } from "react";
import data from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import "../node_modules/react-vis/dist/style.css";

import CompaniesImgContainer from "./CompaniesImgContainer";
import CalcContainer from "./CalcContainer";
import Chart from "./Chart";

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

  // Remove commas from initial investment and turn it into a number
  const formattedInitialInvestment = parseFloat(
    initialInvestment.replace(/,/g, "")
  );
  // Remove commas from annual income and turn it into a number
  const formattedAnnualIncome = parseFloat(annualIncome.replace(/,/g, ""));
  const shares = formattedInitialInvestment / ipoPrice;
  const btc = formattedInitialInvestment / btcClosingPriceOnIpoDate;
  const currentSharesValue = shares * currentCompanyClosingPrice;
  const currentBtcValue = btc * btcCurrentPriceNew;
  const oppCost = currentBtcValue - currentSharesValue;
  const oppTime = (oppCost / formattedAnnualIncome).toFixed(1);
  const oppTimeYears = Math.abs(oppTime.toString().split(".")[0]);
  const oppTimeMonths = Math.abs(
    Math.floor(Number("0." + oppTime.toString().split(".")[1]) * 12)
  );

  // Fetch latest company closing price from API
  const fetchCompanyPrice = async () => {
    setIsLoading(true);
    try {
      const companyResponse = await fetch(companyApi);
      const companyJson = await companyResponse.json();
      setIsLoading(false);
      // Remove commas and turn it into a number
      const closingPrice = parseFloat(
        companyJson["Global Quote"]["08. previous close"].replace(/,/g, "")
      );
      setCurrentCompanyClosingPrice(closingPrice);
    } catch (error) {
      setIsLoading(false);
      // query whether below set is needed
      setCurrentCompanyClosingPrice(defaultCompanyPrice);
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

  // The MP3 file is being stored in Google Drive as a shareable link with anyone. I then took the ID only from that
  // shareable link and put it into the format below where everything after "id=" is the relevant ID for the audio
  const sound = new Audio(
    "https://docs.google.com/uc?export=download&id=13eKa0XAgOn7mATB39bPIg5buNwvcaz2F"
  );

  // Automatically scrolls user down to the bitcoin calculations component
  const executeScroll = () => {
    window.scrollTo({ behavior: "smooth", top: 200 });
  };

  // Fetch the company's current closing price
  useEffect(() => {
    fetchCompanyPrice();
  }, [dataIndex]);

  // Scrolls down the page
  useEffect(() => {
    executeScroll();
  }, [isLoading]);

  return (
    <div className="bitcoin">
      <CompaniesImgContainer oppCost={oppCost} image={image} />

      {isLoading ? null : (
        <>
          <CalcContainer
            id={id}
            company={company}
            symbol={symbol}
            image={image}
            ipoDate={ipoDate}
            ipoPrice={ipoPrice}
            btcClosingPriceOnIpoDate={btcClosingPriceOnIpoDate}
            defaultDate={defaultDate}
            defaultCompanyPrice={defaultCompanyPrice}
            initialInvestment={initialInvestment}
            annualIncome={annualIncome}
            btcCurrentPriceNew={btcCurrentPriceNew}
            currentCompanyClosingPrice={currentCompanyClosingPrice}
            oppCost={oppCost}
            oppTimeMonths={oppTimeMonths}
            oppTimeYears={oppTimeYears}
          />

          <Chart
            company={company}
            currentSharesValue={currentSharesValue}
            currentBtcValue={currentBtcValue}
            oppCost={oppCost}
          />

          <h4 className="ipoDate">
            {company}'s IPO Date: {ipoDate} | IPO Opening Price: ${ipoPrice} |
            Current Price: ${currentCompanyClosingPrice}
          </h4>
          <h4 className="btcPriceIpoDate">
            On {company}'s IPO, you could have bought {btc.toFixed(2)} btc at $
            {btcClosingPriceOnIpoDate} each! 1 btc is now ${btcCurrentPriceNew}
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
