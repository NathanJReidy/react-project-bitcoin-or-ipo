import React, { useState, useEffect } from "react";
import Bitcoin from "./Bitcoin";

function App() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const btcApi = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const [btcCurrentPriceNew, setBtcCurrentPriceNew] = useState(59893);

  const changeState = (e) => {
    setInitialInvestment(
      Number(e.target.value.replace(/\D/g, "")).toLocaleString()
    );
  };

  const changeIncomeState = (e) => {
    setAnnualIncome(Number(e.target.value.replace(/\D/g, "")).toLocaleString());
  };

  // Fetch live btc price from API
  const fetchBtcPrice = async () => {
    try {
      const response = await fetch(btcApi);
      const btcJson = await response.json();
      // Remove commas and turn it into a number
      const btcCurrentNew = parseFloat(btcJson.bpi.USD.rate.replace(/,/g, ""));
      setBtcCurrentPriceNew(btcCurrentNew);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBtcPrice();
  }, []);

  return (
    <main>
      <section className="container">
        <h2 className="title">
          Bitcoin{" "}
          <img
            className="btcGif"
            src="https://media.giphy.com/media/qlWEGYdh86lD03QW9N/giphy.gif"
          />{" "}
          or IPO{" "}
          <img
            className="ipoGif"
            src="https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif"
          />
        </h2>
        <p className="desc">
          Calculate the opportunity cost & time saved if you bought bitcoin
          instead of another dumb tech IPO.
        </p>
        <div className="investmentContainer">
          <h4 className="initialInvestment">Initial Investment: $</h4>
          <div className="investmentAmountWrapper">
            <input
              className="investmentAmount"
              placeholder="Enter USD"
              value={initialInvestment}
              onChange={(e) => changeState(e)}
              style={{
                width:
                  initialInvestment != ""
                    ? (initialInvestment.length + 1) * 8
                    : "5rem",
              }}
            />
          </div>
        </div>
        <div className="incomeContainer">
          <h4 className="income">Annual Income: $</h4>
          <div className="incomeAmountWrapper">
            <input
              className="incomeAmount"
              placeholder="Enter USD"
              value={annualIncome}
              onChange={(e) => changeIncomeState(e)}
              style={{
                width:
                  annualIncome != "" ? (annualIncome.length + 1) * 8 : "5rem",
              }}
            />
          </div>
        </div>

        {initialInvestment != "" && annualIncome != "" ? (
          <>
            <Bitcoin
              initialInvestment={initialInvestment}
              annualIncome={annualIncome}
              btcCurrentPriceNew={btcCurrentPriceNew}
            />
            <h4>
              <a
                className="donate"
                href="https://commerce.coinbase.com/checkout/13c28e57-7054-4187-a923-b83335bd9da9"
                target="_blank"
              >
                Donate bitcoin to the pleb who made this
              </a>
              <span className="loveEmoji"> ❤️‍</span>
            </h4>
            <h4 className="currentOwner">
              <a href="http://twitter.com" target="_blank">
                Current owner: @
              </a>{" "}
            </h4>
          </>
        ) : null}
      </section>
    </main>
  );
}

export default App;
