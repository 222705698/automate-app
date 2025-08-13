// src/components/RegistrationStep1.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegistrationStep1({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    contactNumber: "",
    address: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    password: "",
    confirmPassword: "",
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
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const idRegex = /^[0-9]{13}$/;
    if (!idRegex.test(formData.idNumber)) {
      setError("ID Number must be exactly 13 digits.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (
      formData.dobYear &&
      formData.dobMonth &&
      formData.dobDay &&
      calculateAge(formData.dobYear, formData.dobMonth, formData.dobDay) < 18
    ) {
      setError("You do not qualify for the system (under 18).");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: 600 }}>
        <h3 className="text-center text-success fw-bold mb-4">
          AUTOMATED APP SYSTEM
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* First & Last Name */}
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

        {/* ID Number */}
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

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Contact Number */}
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

        {/* Physical Address */}
        <div className="mb-3">
          <label className="form-label">Physical Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
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
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
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
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
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
                <option key={i} value={2025 - i}>
                  {2025 - i}
                </option>
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

        {/* Confirm Password */}
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
          Next
        </button>

        {/* Sign in link */}
        <div className="text-center mt-3 text-muted">
          Do not have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0 text-primary"
            onClick={() => alert("Redirect to login")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
