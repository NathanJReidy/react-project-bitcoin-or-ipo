import React, { useState } from "react";
import Bitcoin from "./Bitcoin";

function App() {
  const [initialInvestment, setInitialInvestment] = useState("");

  const changeState = (e) => {
    setInitialInvestment(
      Number(e.target.value.replace(/\D/g, "")).toLocaleString()
    );
  };

  console.log(initialInvestment);

  return (
    <main>
      <section className="container">
        <h2 className="title">Bitcoin or IPO</h2>
        <p className="desc">
          Calculate how much more money you would have if you bought bitcoin
          instead of another dumb tech IPO.
        </p>
        <div className="investmentContainer">
          <h4 className="initialInvestment">Initial Investment: $</h4>
          {/* <p className="dollar">$</p> */}
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

        {initialInvestment != "" ? (
          <Bitcoin initialInvestment={initialInvestment} />
        ) : null}
      </section>
    </main>
  );
}

export default App;
