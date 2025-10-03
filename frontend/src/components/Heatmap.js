// Heatmap.js
import React from "react";
import "../styles/Heatmap.css";

function parseYMD(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const Heatmap = ({ days }) => {
  if (!days || days.length === 0) return <p>No data available</p>;

  // group by week
  const weeks = [];
  let currentWeek = [];

  days.forEach((day, idx) => {
    const dateObj = parseYMD(day.date);
    const weekday = dateObj.getDay(); // 0 = Sunday

    // fill empty slots if first day of week is not Sunday
    if (weekday === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentWeek.push(day);

    // push last week at end
    if (idx === days.length - 1) {
      weeks.push(currentWeek);
    }
  });

  return (
    <div className="heatmap-scroll">
      {weeks.map((week, i) => (
        <div key={i} className="heatmap-week">
          {week.map((day) => {
            let styleClass = "";
            if (day.pnl_pct >= 10) {
              styleClass = "big-gain";
            } else if (day.pnl_pct > 0) {
              styleClass = "medium-gain";
            } else if (day.pnl_pct <= -10) {
              styleClass = "big-loss";
            } else if (day.pnl_pct < 0) {
              styleClass = "medium-loss";
            } else if (day.is_trading_day) {
              styleClass = "no-trade";
            } else {
              styleClass = "non-trading";
            }

            return (
              <div
                key={day.date}
                className={`heatmap-day ${styleClass}`}
                title={`${day.date} | PnL: ${day.pnl ?? "—"} | ${
                  day.pnl_pct?.toFixed(2) ?? "—"
                }%`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
