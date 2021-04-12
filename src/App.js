import React from "react";
import Bitcoin from "./Bitcoin";

function App() {
  return (
    <main>
      <section className="container">
        <h2 className="title">Bitcoin or IPO</h2>
        <p className="desc">
          Calculate how much more money you would have if you bought bitcoin
          instead of another dumb tech IPO.
        </p>
        <div className="investmentContainer">
          <h4 className="initialInvestment">Initial Investment: </h4>$
          <input
            className="investmentAmount"
            placeholder="Enter USD amount"
          ></input>
        </div>

        <Bitcoin />
      </section>
    </main>
  );
}

export default App;
