// HeatmapCalendarWrapper.js
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Heatmap from "./Heatmap";
import "../styles/CalendarHeatmapWrapper.css";

const HeatmapCalendarWrapper = () => {
  const [days, setDays] = useState([]);
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "heatmap"

  useEffect(() => {
    fetch("/api/heatmap/")
      .then((res) => res.json())
      .then((data) => setDays(data.days || []))
      .catch((err) => console.error("Failed to load calendar", err));
  }, []);

  // summary stats
  const pnlValues = days.map((d) => d.pnl_pct).filter((v) => v !== null);
  const totalPnl = pnlValues.reduce((a, b) => a + b, 0).toFixed(1);

  return (
    <div className="heatmap-container">
      <div className="calendar-section">
        {/* Header */}
        <div className="calendar-header">
          <h2 className="calendar-title">Trading Journal</h2>
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
            <option value="calendar">Monthly View</option>
            <option value="heatmap">All-Time View</option>
          </select>
          <span
            className={`performance-badge ${
              totalPnl >= 0 ? "performance-positive" : "performance-negative"
            }`}
          >
            {totalPnl}%
          </span>
        </div>

        {/* Content (switch view) */}
        {viewMode === "calendar" ? (
          <Calendar days={days} />
        ) : (
          <Heatmap days={days} />
        )}
      </div>

      <div className="right-panel">
      </div>
    </div>
  );
};

export default HeatmapCalendarWrapper;