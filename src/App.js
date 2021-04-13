import React, { useState } from "react";
import Bitcoin from "./Bitcoin";

function App() {
  const [initialInvestment, setInitialInvestment] = useState(10000);

  const changeState = (e) => {
    console.log(e.target.value);
    setInitialInvestment(e.target.value);
  };

  return (
    <main>
      <section className="container">
        <h2 className="title">Bitcoin or IPO</h2>
        <p className="desc">
          Calculate how much more money you would have if you bought bitcoin
          instead of another dumb tech IPO.
        </p>
        <div className="investmentContainer">
          <h4 className="initialInvestment">Initial Investment: </h4> $
          <input
            className="investmentAmount"
            placeholder="Enter USD amount"
            value={initialInvestment}
            onChange={(e) => changeState(e)}
          />
        </div>

        <Bitcoin />
      </section>
    </main>
  );
}

export default App;
