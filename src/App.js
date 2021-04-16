import React, { useState } from "react";
import Bitcoin from "./Bitcoin";

function App() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");

  const changeState = (e) => {
    setInitialInvestment(
      Number(e.target.value.replace(/\D/g, "")).toLocaleString()
    );
  };

  const changeIncomeState = (e) => {
    setAnnualIncome(Number(e.target.value.replace(/\D/g, "")).toLocaleString());
  };

  console.log(initialInvestment);

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
          <Bitcoin
            initialInvestment={initialInvestment}
            annualIncome={annualIncome}
          />
        ) : null}
      </section>
    </main>
  );
}

export default App;
