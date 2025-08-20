import React from "react";

export default function MobileDashboard({ userName, notificationsCount }) {
  return (
    <div style={{
      maxWidth: 320,
      margin: "auto",
      padding: 12,
      border: "1px solid #ccc",
      borderRadius: 8,
      fontSize: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button>☰</button>
        <div>Welcome, {userName}!</div>
      </div>

      <div style={{ marginTop: 20 }}>
        <button style={{ display: "block", width: "100%", padding: 10, marginBottom: 8 }}>Book Test</button>
        <button style={{ display: "block", width: "100%", padding: 10, marginBottom: 8 }}>My License</button>
        <button style={{ display: "block", width: "100%", padding: 10 }}>Payments</button>
      </div>

      <div style={{ marginTop: 20 }}>
        Notifications ({notificationsCount})
      </div>
    </div>
  );
}
