import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookTestFlow() {
  const [step, setStep] = useState(1);
  const [selectedTest, setSelectedTest] = useState("learner");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  // Simplified May 2024 calendar days 5-11 for demo
  const days = [
    { dayLabel: "Su", isCurrentMonth: true, date: 5 },
    { dayLabel: "Mo", isCurrentMonth: true, date: 6 },
    { dayLabel: "Tu", isCurrentMonth: true, date: 7 },
    { dayLabel: "We", isCurrentMonth: true, date: 8 },
    { dayLabel: "Th", isCurrentMonth: true, date: 9 },
    { dayLabel: "Fr", isCurrentMonth: true, date: 10 },
    { dayLabel: "Sa", isCurrentMonth: true, date: 11 },
  ];

  const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  function handleConfirm() {
    alert(`Booked ${selectedTest === "learner" ? "Learner's License Test" : "Driver's License Test"} on ${selectedDate} at ${selectedSlot}`);
    navigate("/applicant");
  }

  if (step === 1) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
        <h3>SELECT TEST TYPE:</h3>

        <label style={{ display: "block", marginBottom: 12 }}>
          <input
            type="radio"
            name="testType"
            checked={selectedTest === "learner"}
            onChange={() => setSelectedTest("learner")}
          />
          {" "}Learner's License Test
          <div style={{ marginLeft: 20, fontSize: 12 }}>
            - Theory exam<br />- R250 fee
          </div>
        </label>

        <label style={{ display: "block", marginBottom: 20 }}>
          <input
            type="radio"
            name="testType"
            checked={selectedTest === "driver"}
            onChange={() => setSelectedTest("driver")}
          />
          {" "}Driver's License Test
          <div style={{ marginLeft: 20, fontSize: 12 }}>
            - Practical exam<br />- R850 fee
          </div>
        </label>

        <button onClick={() => setStep(2)}>NEXT &gt;</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
        <h3>SELECT DATE:</h3>
        <div>
          <button>May 2024 &gt;</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: 12 }}>
          {days.map(day => (
            <div
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              style={{
                padding: 8,
                cursor: "pointer",
                backgroundColor: selectedDate === day.date ? "#007bff" : "transparent",
                color: selectedDate === day.date ? "white" : "#000",
                borderRadius: 4,
                border: selectedDate === day.date ? "1px solid #0056b3" : "none",
              }}
            >
              {day.date}
            </div>
          ))}
        </div>

        <h4>AVAILABLE SLOTS:</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {slots.map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              style={{
                padding: "6px 12px",
                backgroundColor: selectedSlot === slot ? "#007bff" : "#eee",
                border: "none",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setStep(1)}>&lt; BACK</button>
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedSlot}
          >
            CONFIRM
          </button>
        </div>
      </div>
    );
  }
}
