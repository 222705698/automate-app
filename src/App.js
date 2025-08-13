import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginScreen from "./components/LoginScreen";
import RegistrationStep1 from "./components/RegistrationStep1";
import ApplicantDashboard from "./components/ApplicantDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BookLearnersTest from "./components/BookLearnersTest";
import BookDriversTest from "./components/BookDriverTest";

export default function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState([
    { type: "Vehicle Disc", name: "John Doe" },
    { type: "Test Result", name: "Sarah Smith" },
  ]);

  const handleLogin = (data) => {
    setUser({ ...data, firstName: "John", lastName: "Doe", email: data.email });
  };

  const handleRegisterNext = (data) => {
    setUser({ ...data, isApplicant: true });
    alert("Personal details saved: " + JSON.stringify(data));
  };

  const handleBooking = (type, date) => {
    setBookings([...bookings, { type, date, user: user.firstName }]);
  };

  return (
    <Router>
      <Routes>
        {/* First page: Login */}
        <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<RegistrationStep1 onNext={handleRegisterNext} />}
        />

        {/* Applicant Dashboard */}
        <Route
          path="/applicant"
          element={
            user && user.isApplicant ? (
              <ApplicantDashboard userData={user} bookings={bookings} />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />

        {/* Booking routes */}
        <Route
          path="/book-learners-test"
          element={
            <BookLearnersTest
              onBook={(date) => handleBooking("Learners Test", date)}
            />
          }
        />
        <Route
          path="/book-drivers-test"
          element={
            <BookDriversTest
              onBook={(date) => handleBooking("Driver's Test", date)}
            />
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            user && !user.isApplicant ? (
              <AdminDashboard
                bookings={bookings}
                payments={payments}
                pendingApprovals={pendingApprovals}
              />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
