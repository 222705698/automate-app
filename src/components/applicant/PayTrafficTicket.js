import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CreditCard, CheckCircle, Search } from "lucide-react";
import SharedLayout from "../sharedPages/SharedLayout";

export default function PayTrafficTicket({ onPayment }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ticketNumber, setTicketNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  // Mock ticket data
  const mockTickets = [
    {
      ticketNumber: "TF123456",
      offense: "Speeding - 20km/h over limit",
      location: "Main Road, Cape Town",
      date: "2024-01-15",
      amount: 1500,
      dueDate: "2024-03-15",
      status: "outstanding",
    },
    {
      ticketNumber: "TF789012",
      offense: "Illegal parking",
      location: "Long Street, Cape Town",
      date: "2024-01-20",
      amount: 500,
      dueDate: "2024-03-20",
      status: "outstanding",
    },
  ];

  const searchTicket = () => {
    setLoading(true);
    setTimeout(() => {
      const ticket = mockTickets.find((t) => t.ticketNumber === ticketNumber);
      if (ticket) {
        setTicketDetails(ticket);
        setStep(2);
      } else {
        alert("Ticket not found. Please check your ticket number.");
      }
      setLoading(false);
    }, 1000);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const paymentData = {
        type: "Traffic Ticket Payment",
        ticketNumber: ticketDetails.ticketNumber,
        amount: ticketDetails.amount,
        method: paymentMethod,
        reference: `TT${Date.now()}`,
        status: "completed",
      };
      if (onPayment) onPayment(paymentData);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
   <div title="Pay Traffic Ticket">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > stepNum ? "bg-red-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {step === 1 && "Find Ticket"}
                {step === 2 && "Payment"}
                {step === 3 && "Confirmation"}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1 - Find Ticket */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Pay Traffic Ticket
              </h1>
              <p className="text-gray-600">
                Enter your ticket details to find and pay outstanding fines
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
                  placeholder="e.g., TF123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Found on your traffic fine notice
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver's License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Enter your license number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For verification purposes
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Sample Ticket Numbers (for demo)
                </h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    <strong>TF123456</strong> - Speeding fine (R1,500)
                  </p>
                  <p>
                    <strong>TF789012</strong> - Parking fine (R500)
                  </p>
                </div>
              </div>

              <button
                onClick={searchTicket}
                disabled={!ticketNumber || !licenseNumber || loading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Find Ticket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Payment */}
        {step === 2 && ticketDetails && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment</h1>
              <p className="text-gray-600">
                Complete your traffic ticket payment
              </p>
            </div>

            {/* Ticket Details */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-red-900 mb-3">Ticket Details</h3>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex justify-between">
                  <span>Ticket Number:</span>
                  <span className="font-medium">{ticketDetails.ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Offense:</span>
                  <span className="font-medium">{ticketDetails.offense}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{ticketDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{ticketDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-medium">{ticketDetails.dueDate}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-red-300 text-base">
                  <span>Amount Due:</span>
                  <span className="text-red-900">R{ticketDetails.amount}</span>
                </div>
              </div>
            </div>

            {new Date(ticketDetails.dueDate) < new Date() && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Overdue Notice</h4>
                    <p className="text-sm text-yellow-800">
                      This ticket is overdue. Additional penalties may apply. Pay immediately to avoid further charges.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Pay instantly with your card</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="eft"
                    checked={paymentMethod === "eft"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">EFT Transfer</p>
                    <p className="text-sm text-gray-600">Electronic funds transfer</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-medium transition-colors"
            >
              {loading ? "Processing Payment..." : `Pay R${ticketDetails.amount}`}
            </button>
          </div>
        )}

        {/* Step 3 - Confirmation */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-6">
                Your traffic ticket has been paid successfully
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-green-900 mb-3">Payment Confirmation</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p>
                    <strong>Ticket Number:</strong> {ticketDetails?.ticketNumber}
                  </p>
                  <p>
                    <strong>Amount Paid:</strong> R{ticketDetails?.amount}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {paymentMethod === "card" ? "Card Payment" : "EFT Transfer"}
                  </p>
                  <p>
                    <strong>Reference:</strong> TT{Date.now()}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/applicant")}
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Return to Dashboard
                </button>
                <p className="text-sm text-gray-600">
                  Keep this reference number for your records. A receipt will be emailed to you.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
   </div>

  );
}
