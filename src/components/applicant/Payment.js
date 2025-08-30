import React, { useState } from "react";
import { CreditCard } from "lucide-react";

function Payment({ amount, onPay }) {
  const [method, setMethod] = useState("card");

  const handlePay = () => {
    onPay({ amount, method, status: "paid" });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5" /> Payment
      </h2>
      <p className="mb-2">Amount: <strong>R {amount}</strong></p>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border p-2 rounded-md mb-4"
      >
        <option value="card">Card</option>
        {/* <option value="eft">EFT</option> */}
        <option value="cash">Cash</option>
      </select>
      <button
        onClick={handlePay}
        className="w-full bg-blue-600 text-white p-2 rounded-md"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
