import React from "react";

const CalcContainer = ({
  id,
  company,
  symbol,
  image,
  ipoDate,
  ipoPrice,
  btcClosingPriceOnIpoDate,
  defaultDate,
  defaultCompanyPrice,
  initialInvestment,
  annualIncome,
  btcCurrentPriceNew,
  currentCompanyClosingPrice,
  oppCost,
  oppTimeMonths,
  oppTimeYears,
}) => {
  // Rounds opportunity cost to nearest 2 decimal places and turns it into a string with commas
  const calcOppCost = () => {
    return Number(oppCost.toFixed(2)).toLocaleString("en-US");
  };

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
    } else {
      return `${Math.abs(oppTimeYears)} years & ${Math.abs(
        oppTimeMonths
      )} months`;
    }
  };

  return (
    <>
      <h3 className="calcContainer">
        <span className="span">If you bought</span>
        <span className="btc">
          &ensp;${initialInvestment} of bitcoin &ensp;{" "}
        </span>{" "}
        <span className="span">instead of</span>
        <span className="company"> &ensp; {company}'s IPO &ensp; </span>
        {oppCost >= 0 ? (
          <>
            <span className="span">You would have gained an extra</span>
            <span className="oppCost"> &ensp; ${calcOppCost()} &ensp; </span>
          </>
        ) : (
          <>
            <span className="span">You would have missed an extra</span>
            <span className="oppCost">
              {" "}
              &ensp; $
              {Math.abs(Number(oppCost.toFixed(2))).toLocaleString(
                "en-US"
              )}{" "}
              &ensp;{" "}
            </span>
          </>
        )}
        {annualIncome != 0 ? (
          <>
            {oppCost >= 0 ? (
              <span className="span">& saved &ensp;</span>
            ) : (
              <span className="span">& added &ensp;</span>
            )}
            <span className="oppTime">{formatYearMonth()}</span>
            <span className="span">&ensp; of your life spent working</span>
          </>
        ) : null}
      </h3>
    </>
  );
};

export default CalcContainer;
