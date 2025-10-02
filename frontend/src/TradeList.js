import React, { useEffect, useState } from "react";

function TradeList() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetch("/api/trades/")  // proxy handles forwarding to Django
      .then((res) => res.json())
      .then((data) => setTrades(data));
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.ticker} - {trade.date} → {trade.net_profit_loss}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TradeList;
