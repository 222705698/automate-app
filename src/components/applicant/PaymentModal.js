import React, { useState } from "react";

function PaymentModal({ onClose }) {
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);

    // Simulate API call / payment process
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "10px",
        width: "300px",
        margin: "auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {!success ? (
        <>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Complete Payment</h2>
          <p style={{ color: "#555" }}>Click below to finalize your registration.</p>
          <button
            onClick={handlePayment}
            disabled={isPaying}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              background: isPaying ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: isPaying ? "not-allowed" : "pointer",
            }}
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </>
      ) : (
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "green" }}>
            🎉 Registration was successful!
          </h2>
          <p style={{ color: "#555" }}>You are now registered.</p>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
