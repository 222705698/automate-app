import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, CreditCard, CheckCircle } from "lucide-react";
import SharedLayout from "../sharedPages/SharedLayout";

function VehicleRegistration({ onClose, onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    engineNumber: "",
    chassisNumber: "",
    licensePlate: "",
    // payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const registrationFee = 850;
  const issueDate = new Date();
  const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Finalize registration
      const vehicle = {
        ...formData,
        registrationFee,
        registrationDate: issueDate.toISOString(),
        discIssueDate: issueDate.toISOString(),
        discExpiryDate: expiryDate.toISOString(),
        status: "registered",
      };
      if (onComplete) onComplete(vehicle);

      // ✅ Show success message instead of navigating
      setSuccess(true);
    }
  };

  // Inline styles (same as before)
  const containerStyle = { minHeight: "100vh", background: "linear-gradient(to bottom right, #eff6ff, #dbeafe)", padding: "48px", display: "flex", justifyContent: "center", alignItems: "center" };
  const cardStyle = { backgroundColor: "white", borderRadius: "24px", padding: "40px", maxWidth: "700px", width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" };
  const headerStyle = { textAlign: "center", marginBottom: "40px" };
  const iconWrapperStyle = { backgroundColor: "#dbeafe", padding: "16px", borderRadius: "50%", display: "inline-flex", marginBottom: "16px" };
  const titleStyle = { fontSize: "32px", fontWeight: "bold", color: "#111827" };
  const subtitleStyle = { fontSize: "16px", color: "#4b5563", marginTop: "8px" };
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "12px", outline: "none", fontSize: "14px", marginBottom: "12px" };
  const selectStyle = { ...inputStyle, backgroundColor: "white" };
  const buttonStyle = { flex: 1, padding: "14px", fontWeight: "bold", borderRadius: "12px", cursor: "pointer", border: "none", fontSize: "16px" };
  const cancelButtonStyle = { ...buttonStyle, backgroundColor: "white", color: "#374151", border: "1px solid #d1d5db", marginRight: "12px" };
  const submitButtonStyle = { ...buttonStyle, background: "linear-gradient(to right, #2563eb, #4f46e5)", color: "white" };
  const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" };

  return (
    <SharedLayout>
      <div style={containerStyle}>
        <div style={cardStyle}>
          {!success ? (
            <>
              {/* Header */}
              <div style={headerStyle}>
                <div style={iconWrapperStyle}>
                  {step === 1 ? <Car size={40} color="#2563eb" /> : <CreditCard size={40} color="#2563eb" />}
                </div>
                <h1 style={titleStyle}>Vehicle Registration</h1>
                <p style={subtitleStyle}>
                  {step === 1 ? "Enter vehicle details" : "Complete payment to finish registration"}
                </p>
              </div>

              {/* Form */}
              <form>
                {step === 1 && (
                  <>
                    <div style={gridStyle}>
                      <div>
                        <label>Make</label>
                        <input type="text" name="make" required value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" style={inputStyle} />
                      </div>
                      <div>
                        <label>Model</label>
                        <input type="text" name="model" required value={formData.model} onChange={handleChange} placeholder="e.g., Corolla" style={inputStyle} />
                      </div>
                    </div>

                    <div style={gridStyle}>
                      <div>
                        <label>Year</label>
                        <select name="year" required value={formData.year} onChange={handleChange} style={selectStyle}>
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Color</label>
                        <input type="text" name="color" required value={formData.color} onChange={handleChange} placeholder="e.g., White" style={inputStyle} />
                      </div>
                    </div>

                    <div style={gridStyle}>
                      <div>
                        <label>Engine Number</label>
                        <input type="text" name="engineNumber" required value={formData.engineNumber} onChange={handleChange} placeholder="Engine number" style={inputStyle} />
                      </div>
                      <div>
                        <label>Chassis Number</label>
                        <input type="text" name="chassisNumber" required value={formData.chassisNumber} onChange={handleChange} placeholder="Chassis number" style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label>Preferred License Plate</label>
                      <input type="text" name="licensePlate" value={formData.licensePlate} onChange={handleChange} placeholder="Optional: Custom plate preference" style={inputStyle} />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
                      <p><strong>Registration Fee:</strong> R {registrationFee}</p>
                      <p><strong>Disc Issue Date:</strong> {issueDate.toLocaleDateString()}</p>
                      <p><strong>Disc Expiry Date:</strong> {expiryDate.toLocaleDateString()}</p>
                    </div>

                    <div>
                      <label>Cardholder Name</label>
                      <input type="text" name="cardholderName" required value={formData.cardholderName} onChange={handleChange} placeholder="Full name on card" style={inputStyle} />
                    </div>
                    <div>
                      <label>Card Number</label>
                      <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" style={inputStyle} />
                    </div>
                    <div style={gridStyle}>
                      <div>
                        <label>Expiry Date</label>
                        <input type="text" name="expiryDate" required value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" style={inputStyle} />
                      </div>
                      <div>
                        <label>CVV</label>
                        <input type="text" name="cvv" required value={formData.cvv} onChange={handleChange} placeholder="123" style={inputStyle} />
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                  {step === 2 && (
                    <button type="button" onClick={() => setStep(1)} style={cancelButtonStyle}>Back</button>
                  )}
                  <button type="button" onClick={handleCancel} style={cancelButtonStyle}>Cancel</button>
                  <button type="button" onClick={handleContinue} style={submitButtonStyle}>
                    {step === 1 ? "Continue to Payment" : `Pay R ${registrationFee} & Register`}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <CheckCircle size={60} color="green" />
              <h2 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>🎉 Registration Successful!</h2>
              <p style={{ marginTop: "10px", color: "#4b5563" }}>Your vehicle has been registered.</p>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "12px" }}>
                <button 
                  onClick={handleCancel} 
                  style={{ padding: "12px 20px", borderRadius: "12px", background: "#374151", color: "white", border: "none", cursor: "pointer" }}
                >
                  Close
                </button>
                <button 
                  onClick={() => navigate("/vehicle-disc", { state: { vehicle: formData } })} 
                  style={{ padding: "12px 20px", borderRadius: "12px", background: "#2563eb", color: "white", border: "none", cursor: "pointer" }}
                >
                  View Disc
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SharedLayout>
  );
}

export default VehicleRegistration;
