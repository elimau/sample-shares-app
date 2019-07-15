import React from "react";

function Form(props) {
  const { ticker, setTicker } = props;
  return (
    <div>
      <label htmlFor="ticker">Enter ticker:</label>
      <input
        type="input"
        id="ticker"
        value={ticker}
        onChange={evt => setTicker(evt.target.value)}
      />
    </div>
  );
}

export default Form;
