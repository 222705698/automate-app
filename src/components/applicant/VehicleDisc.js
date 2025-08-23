import React from "react";
import { CheckCircle, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SharedLayout from "../sharedPages/SharedLayout";

function VehicleDisc() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle } = location.state || {};

  if (!vehicle) return null;

  const discIssueDate = vehicle.discIssueDate ? new Date(vehicle.discIssueDate) : new Date();
  const discExpiryDate = vehicle.discExpiryDate
    ? new Date(vehicle.discExpiryDate)
    : new Date(new Date(discIssueDate).setFullYear(discIssueDate.getFullYear() + 5));

  // Styles
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "500px",
    padding: "24px",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  };

  const closeStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
    cursor: "pointer",
    color: "#6B7280", // gray-500
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#047857",
    marginBottom: "16px",
    justifyContent: "center",
  };

  const rowStyle = { display: "flex", justifyContent: "space-between", marginBottom: "8px" };
  const labelStyle = { fontWeight: "600", color: "#374151" };
  const valueStyle = { color: "#111827" };

  return (
     <SharedLayout>
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <X size={24} style={closeStyle} onClick={() => navigate(-1)} />
        <h3 style={headerStyle}>
          <CheckCircle size={24} color="#047857" /> Vehicle Disc
        </h3>

        <div style={rowStyle}>
          <span style={labelStyle}>Make:</span>
          <span style={valueStyle}>{vehicle.make}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Model:</span>
          <span style={valueStyle}>{vehicle.model}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Year:</span>
          <span style={valueStyle}>{vehicle.year}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Color:</span>
          <span style={valueStyle}>{vehicle.color}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Engine No:</span>
          <span style={valueStyle}>{vehicle.engineNumber}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Chassis No:</span>
          <span style={valueStyle}>{vehicle.chassisNumber}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Plate:</span>
          <span style={valueStyle}>{vehicle.licensePlate}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Issued:</span>
          <span style={valueStyle}>{discIssueDate.toLocaleDateString()}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Expires:</span>
          <span style={valueStyle}>{discExpiryDate.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
    </SharedLayout>
  );
}

export default VehicleDisc;
