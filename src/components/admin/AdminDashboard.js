import React from "react";

export default function AdminDashboard({ bookings, payments, pendingApprovals }) {
  return (
    <div className="container mt-4">
      <h2>ADMIN DASHBOARD</h2>

      <div className="card p-3 mb-3 shadow">
        <h5>Pending Approvals ({pendingApprovals.length})</h5>
        <ul className="list-group">
          {pendingApprovals.map((p, i) => (
            <li key={i} className="list-group-item">{p.type} - {p.name}</li>
          ))}
        </ul>
      </div>

      <div className="card p-3 mb-3 shadow">
        <h5>Bookings ({bookings.length})</h5>
        {bookings.length === 0 ? <p>No bookings yet</p> : (
          <ul className="list-group">
            {bookings.map((b, i) => (
              <li key={i} className="list-group-item">{b.user} booked {b.type} - {b.date}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-3 shadow">
        <h5>Payments</h5>
        <p>Total Today: R{payments}</p>
      </div>
    </div>
  );
}
