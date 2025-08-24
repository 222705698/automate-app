import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginScreen from "./components/SingUpLogin/LoginScreen";
import RegistrationStep1 from "./components/SingUpLogin/RegistrationStep1";
import ApplicantDashboard from "./components/applicant/ApplicantDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import VehicleRegistration from "./components/applicant/VehicleRegistration";
import VehicleDisc from "./components/applicant/VehicleDisc";
import PayTrafficTicket from "./components/applicant/PayTrafficTicket";
import Booking from './components/applicant/Booking';
import BookingDetails from './components/applicant/BookingDetails';

export default function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState([
   
  ]);

  const handleLogin = (data) => {
 setUser({ ...data, isApplicant: true });
    alert("Personal details saved: " + JSON.stringify(data));  };

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

        {/* vehicle disc */}
        <Route path="/VehicleRegistration" element={<VehicleRegistration />} />
        <Route path="/vehicle-disc" element={<VehicleDisc />} />
        <Route path="/pay-ticket" element={<PayTrafficTicket />} />
        <Route path="/booking-details/:id" element={<BookingDetails />} />

        {/* Booking routes */}
        <Route
          path="/booking"
          element={
            user && user.isApplicant ? (
              <Booking onBook={(date) => handleBooking("Booking", date)} />
            ) : (
              <Navigate to="/" replace />
            )
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