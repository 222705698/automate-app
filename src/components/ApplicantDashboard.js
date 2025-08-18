import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SharedLayout from "./sharedPages/SharedLayout";

export default function ApplicantDashboard({ userData, bookings }) {
  const navigate = useNavigate();

  return (
    <SharedLayout>
      <div className="container mt-4">
        <h2>Welcome, {userData.firstName}</h2>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card p-3 mb-3 shadow">
              <h5>Profile Info</h5>
              <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>

            <div className="card p-3 shadow">
              <h5>Bookings</h5>
              {bookings.length === 0 ? (
                <p>No bookings yet</p>
              ) : (
                <ul className="list-group">
                  {bookings.map((b, i) => (
                    <li key={i} className="list-group-item">
                      {b.type} - {b.date}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-4 shadow">
              <h5>Next Steps</h5>
              <p>Please complete your test booking.</p>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}