import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import ApiService from "../../services/ApiService";

export default function RegistrationStep1({ onNext }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    contactNumber: "",
    street: "",
    city: "",
    province: "",
    country: "",
    dobYear: "",
    dobMonth: "",
    dobDay: "",
    password: "",
    confirmPassword: "",
    role: "APPLICANT",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const validateForm = () => {
   const idRegex = /^[0-9]{13}$/;
  if (!idRegex.test(formData.idNumber)) {
    setError("ID Number must be exactly 13 digits.");
    return false;
  }

  // Extract birthdate from ID number
  const idDobPart = formData.idNumber.substring(0, 6); // YYMMDD
  const idYear = parseInt(idDobPart.substring(0, 2), 10);
  const idMonth = parseInt(idDobPart.substring(2, 4), 10);
  const idDay = parseInt(idDobPart.substring(4, 6), 10);

  // Convert to full year (assume 19xx or 20xx)
  const currentYear = new Date().getFullYear();
  const fullYear = idYear + (idYear <= currentYear % 100 ? 2000 : 1900);

  // Compare with selected DOB
  if (
    parseInt(formData.dobYear, 10) !== fullYear ||
    parseInt(formData.dobMonth, 10) !== idMonth ||
    parseInt(formData.dobDay, 10) !== idDay
  ) {
    setError("ID Number and Date of Birth do not match.");
    return false;
  }

    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const hasLength = password.length >= 8;

    if (!hasLower) {
      setError("Password must include at least one lowercase letter.");
      return false;
    }
    if (!hasUpper) {
      setError("Password must include at least one uppercase letter.");
      return false;
    }
    if (!hasDigit) {
      setError("Password must include at least one number.");
      return false;
    }
    if (!hasSpecial) {
      setError("Password must include at least one special character (@$!%*?&).");
      return false;
    }
    if (!hasLength) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (
      formData.dobYear &&
      formData.dobMonth &&
      formData.dobDay &&
      calculateAge(formData.dobYear, formData.dobMonth, formData.dobDay) < 18
    ) {
      setError("You must be at least 18 years old.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const birthDate = `${formData.dobYear}-${String(formData.dobMonth).padStart(
      2,
      "0"
    )}-${String(formData.dobDay).padStart(2, "0")}`;

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      idNumber: formData.idNumber,
      birthDate: birthDate,
      password: formData.password.trim(),
      role: formData.role,
      contact: {
        email: formData.email,
        cellphone: formData.contactNumber,
      },
      address: {
        street: formData.street,
        city: formData.city,
        province: formData.province,
        country: formData.country,
      },
    };

    try {
      const result = await ApiService.registerUser(payload);
      console.log("Registered successfully:", result);
      alert("Registration successful!");
      onNext(payload);
      navigate("/applicant");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: 600 }}>
        <h3 className="text-center text-success fw-bold mb-4">
          AUTOMATED APP SYSTEM
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Name */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ID */}
        <div className="mb-3">
          <label className="form-label">ID Number</label>
          <input
            type="text"
            name="idNumber"
            className="form-control"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            className="form-control"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Street</label>
          <input
            type="text"
            name="street"
            className="form-control"
            value={formData.street}
            onChange={handleChange}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Province</label>
            <input
              type="text"
              name="province"
              className="form-control"
              value={formData.province}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <div className="d-flex gap-2">
            <select
              name="dobMonth"
              className="form-select"
              value={formData.dobMonth}
              onChange={handleChange}
            >
              <option value="">Month</option>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((month, i) => (
                <option key={i} value={i + 1}>{month}</option>
              ))}
            </select>
            <select
              name="dobDay"
              className="form-select"
              value={formData.dobDay}
              onChange={handleChange}
            >
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select
              name="dobYear"
              className="form-select"
              value={formData.dobYear}
              onChange={handleChange}
            >
              <option value="">Year</option>
              {[...Array(100)].map((_, i) => (
                <option key={i} value={2025 - i}>{2025 - i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="btn btn-link p-0 text-primary"
            onClick={() => alert("Forgot password clicked")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Register
        </button>

        {/* Sign in link */}
        <div className="text-center mt-3 text-muted">
  Already have an account?{" "}
  <span
    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
    onClick={() => navigate("/")} // <-- change "/signin" to your actual sign-in route
  >
    Sign in
  </span>
</div>
      </div>
    </div>
  );
}
