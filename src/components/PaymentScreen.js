import React, { useState } from "react";

export default function PaymentScreen({ itemName, amount, onPay }) {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [agreed, setAgreed] = useState(false);

  function handlePay() {
    if (!agreed) return alert("You must agree to the terms.");
    onPay({ paymentMethod, cardDetails });
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>PAYMENT SUMMARY</h3>

      <p><strong>Item:</strong> {itemName}</p>
      <p><strong>Amount:</strong> R{amount.toFixed(2)}</p>

      <div>
        <h4>PAYMENT METHOD:</h4>
        <label>
          <input
            type="radio"
            checked={paymentMethod === "creditCard"}
            onChange={() => setPaymentMethod("creditCard")}
          /> Credit Card
        </label><br />
        <label>
          <input
            type="radio"
            checked={paymentMethod === "eft"}
            onChange={() => setPaymentMethod("eft")}
          /> EFT
        </label><br />
        <label>
          <input
            type="radio"
            checked={paymentMethod === "voucher"}
            onChange={() => setPaymentMethod("voucher")}
          /> Voucher
        </label>
      </div>

      {paymentMethod === "creditCard" && (
        <div style={{ marginTop: 12 }}>
          <h4>CARD DETAILS:</h4>
          <input
            type="text"
            placeholder="Number"
            value={cardDetails.number}
            onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />
          <input
            type="text"
            placeholder="Expiry MM/YY"
            value={cardDetails.expiry}
            onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            style={{ width: "48%", marginRight: "4%", padding: 8, marginBottom: 8 }}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            style={{ width: "48%", padding: 8, marginBottom: 8 }}
          />
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
          /> I agree to the terms and conditions.
        </label>
      </div>

      <button
        disabled={!agreed}
        onClick={handlePay}
        style={{ width: "100%", padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4, marginTop: 8 }}
      >
        PAY NOW
      </button>
    </div>
  );
}
