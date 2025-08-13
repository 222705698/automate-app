import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplicantDashboard({ userData, bookings }) {
  const navigate = useNavigate();
  const [showLearnerModal, setShowLearnerModal] = useState(false);
  const [hasLearner, setHasLearner] = useState(false);

  useEffect(() => {
    setShowLearnerModal(true);
  }, []);

  const handleLearnerResponse = (answer) => {
    setHasLearner(answer);
    setShowLearnerModal(false);
    navigate(answer ? "/book-drivers-test" : "/book-learners-test");
  };

  return (
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
            {!hasLearner && <p>Please complete your test booking above.</p>}
          </div>
        </div>
      </div>

      {showLearnerModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Setup</h5>
              </div>
              <div className="modal-body">
                <p>Do you have an eLearner's license?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => handleLearnerResponse(true)}>Yes</button>
                <button className="btn btn-secondary" onClick={() => handleLearnerResponse(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
