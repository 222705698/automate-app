// src/components/BookDriverTest.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookDriverTest() {
  const [testDate, setTestDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Driver's test booked for: ${testDate}`);
    navigate("/applicant"); // navigate back to applicant dashboard
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Book Driver's Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Preferred Test Date</label>
            <input
              type="date"
              className="form-control"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Book Test
          </button>
        </form>
      </div>
    </div>
  );
}
