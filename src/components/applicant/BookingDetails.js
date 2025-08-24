import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import SharedLayout from "../sharedPages/SharedLayout";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would come from an API call using the booking ID
  // For demo purposes, we'll use localStorage
  const bookingDetails = JSON.parse(localStorage.getItem('lastBooking') || '{}');
  
  // If no booking found
  if (!bookingDetails.id) {
    return (
     
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body text-center py-5">
                  <h4 className="text-danger mb-3">Booking Not Found</h4>
                  <p className="text-muted mb-4">
                    We couldn't find the booking details you're looking for.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/applicant")}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    );
  }

  return (
   
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Booking Details</h5>
              </div>
              <div className="card-body">
                {/* Booking Status Banner */}
                <div className="alert alert-success mb-4">
                  <div className="d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <span className="fw-bold">Confirmed</span>
                    <span className="ms-auto">Booking Reference: {bookingDetails.reference}</span>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-muted">Test Information</h6>
                    <div className="mb-3">
                      <strong>Test Type:</strong> {bookingDetails.testType?.title}
                    </div>
                    <div className="mb-3">
                      <strong>Test Date:</strong> {bookingDetails.testDate}
                    </div>
                    <div className="mb-3">
                      <strong>Test Time:</strong> {bookingDetails.testTime}
                    </div>
                    <div className="mb-3">
                      <strong>License Code:</strong> {bookingDetails.licenseCode}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="text-muted">Venue Details</h6>
                    <div className="mb-3">
                      <strong>Venue:</strong> {bookingDetails.testVenue}
                    </div>
                    <div className="mb-3">
                      <strong>Address:</strong> {bookingDetails.testAddress}
                    </div>
                    
                    <h6 className="text-muted mt-4">Payment Information</h6>
                    <div className="mb-3">
                      <strong>Amount Paid:</strong> R {bookingDetails.payment?.amount}
                    </div>
                    <div className="mb-3">
                      <strong>Payment Method:</strong> {bookingDetails.payment?.method === 'credit_card' ? 'Credit Card' : 
                                                       bookingDetails.payment?.method === 'debit_card' ? 'Debit Card' : 
                                                       'Bank Transfer'}
                    </div>
                    <div className="mb-3">
                      <strong>Payment Status:</strong> <span className="badge bg-success">{bookingDetails.payment?.status}</span>
                    </div>
                  </div>
                </div>
                
                {bookingDetails.notes && (
                  <div className="mt-4">
                    <h6 className="text-muted">Additional Notes</h6>
                    <p>{bookingDetails.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-top">
                  <h6 className="text-muted">What to Bring to Your Test</h6>
                  <ul>
                    <li>Your ID document or passport</li>
                    <li>Your current license (if applicable)</li>
                    <li>Proof of residence</li>
                    <li>Your booking confirmation (this page)</li>
                  </ul>
                  
                  <div className="alert alert-warning mt-3">
                    <strong>Important:</strong> Please arrive at least 30 minutes before your scheduled test time.
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mt-5">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/applicant")}
                  >
                    Back to Dashboard
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => window.print()}
                  >
                    Print Confirmation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default BookingDetails;