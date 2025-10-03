// Calendar.js
import React from "react";
import "../styles/Calendar.css";

function parseYMD(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const Calendar = ({ days }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstWeekdayIndex = days.length ? parseYMD(days[0].date).getDay() : 0;
  const emptyBoxes = Array(firstWeekdayIndex).fill(null);

  const handleDayClick = (iso) => {
    console.log("Clicked:", iso);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-grid">
        {weekdays.map((wd) => (
          <div key={wd} className="day-header">
            {wd}
          </div>
        ))}

        {emptyBoxes.map((_, i) => (
          <div key={`empty-${i}`} className="day-box empty" />
        ))}

        {days.map((day) => {
          const dateObj = parseYMD(day.date);
          const dayNum = dateObj.getDate();

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
              className={`day-box ${styleClass}`}
              title={`${day.date} | PnL: ${day.pnl ?? "—"} | ${
                day.pnl_pct?.toFixed(2) ?? "—"
              }%`}
              onClick={() => handleDayClick(day.date)}
            >
              <div className="day-number">{dayNum}</div>
              {day.pnl_pct !== null && (
                <div className="day-pct">{day.pnl_pct.toFixed(1)}%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;