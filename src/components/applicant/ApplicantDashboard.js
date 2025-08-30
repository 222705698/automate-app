import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SharedLayout from "../sharedPages/SharedLayout";
import ApiService from "../../services/ApiService"; // Import your API service

export default function ApplicantDashboard({ userData, vehicles }) {
  const navigate = useNavigate();
  const [hasLicense, setHasLicense] = useState(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [userLicenseInfo, setUserLicenseInfo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [myVehicles, setMyVehicles] = useState(vehicles || []);
  const [user, setUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]); // State for user-specific bookings
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!userData || !userData.userId) navigate("/login");
  }, [userData, navigate]);

  // Fetch user-specific bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (userData && userData.userId) {
        try {
          setLoadingBookings(true);
          // Call your API to get bookings for this specific user
          const response = await ApiService.getUserBookings(userData.userId);
          
          if (response.success) {
            setUserBookings(response.data);
          } else {
            console.error("Failed to fetch user bookings:", response.error);
          }
        } catch (error) {
          console.error("Error fetching user bookings:", error);
        } finally {
          setLoadingBookings(false);
        }
      }
    };

    fetchUserBookings();
  }, [userData]);

  const handleLicenseSelection = (type) => {
    setLicenseType(type);
    setShowLicenseModal(true);
  };

  const saveLicenseInfo = () => {
    setUserLicenseInfo({ type: licenseType, number: licenseNumber });
    setHasLicense(licenseType);
    setShowLicenseModal(false);
    setLicenseNumber("");
  };

  // Service cards data
  const services = [
    {
      title: "Book Learners Test",
      description: "Schedule your learners license test",
      image: learners,
      action: () => navigate("/booking?type=learners", { state: { userData } }),
      requires: null,
    },
    {   
      title: "Book Drivers Test",
      description: "Schedule your drivers license test",
      image: learnersTestImg,
      action: () => navigate("/booking?type=drivers", { state: { userData } }),
      requires: "learners",
    },
    {
      title: "Register Vehicle",
      description: "Register your vehicle and get disc",
      image: driversTestImg,
      action: () => navigate("/VehicleRegistration"),
      requires: null,
    },
    {
      title: "Renew Vehicle Disc",
      description: "Renew your vehicle disc",
      image: disc,
      action: () => navigate("/renew-disc"),
      requires: null,
    },
    {
      title: "Pay Traffic Ticket",
      description: "Pay outstanding traffic fines",
      image: payTicketImg,
      action: () => navigate("/pay-ticket"),
      requires: null,
    },
  ];

  const canAccessService = (service) => {
    if (!service.requires) return true;
    return userLicenseInfo && userLicenseInfo.type === service.requires;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5); // Display HH:MM format
  };

  return (
    <SharedLayout>
      <div className="container-fluid px-0">
        {/* Hero Section */}
        <section
          style={{
            width: "100%",
            minHeight: "450px",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${driversTestImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            padding: "2rem 1rem",
          }}
        >
          <div className="px-3" style={{ maxWidth: "800px" }}>
            <h1 className="display-4 fw-bold mb-3">
              Effortless Vehicle Disc Registration
            </h1>
            <p className="lead mt-3 fs-4">
              Your one-stop solution for licensing, fines management, and test
              bookings
            </p>
            <button
              className="btn btn-primary btn-lg mt-4 px-4 py-2"
              onClick={() =>
                document
                  .getElementById("services-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="fw-bold mb-4">About Our Service</h2>
                <p className="lead text-muted">
                  At our core, we strive to simplify your vehicle-related
                  bureaucratic tasks. Our platform enables you to seamlessly
                  register for vehicle discs, pay off tickets swiftly, and
                  easily book appointments for learners and drivers tests.
                </p>
                <p className="text-muted">
                  We aim to save you time and provide peace of mind, ensuring
                  smooth processes for all your vehicular needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width CTA Section */}
        <section
          className="py-5 rounded-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${registerVehicleImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center text-white">
                <h2 className="display-5 fw-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="lead mb-4">
                  Join thousands of satisfied customers who have simplified
                  their vehicle documentation process with our services.
                </p>
                <button
                  className="btn btn-primary btn-lg px-4 py-2"
                  onClick={() =>
                    document
                      .getElementById("services-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Our Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* User Info Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-5">
                  <h2 className="fw-bold">Your Driving Information</h2>
                  <p className="text-muted">
                    Please let us know which license(s) you currently hold. This
                    helps us provide you with the right services.
                  </p>
                </div>

                {/* License Info */}
                {userLicenseInfo ? (
                  <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="fw-bold mb-1">
                          {userLicenseInfo.type === "license"
                            ? "Driver's License"
                            : "Learner's Permit"}
                        </h5>
                        <p className="mb-1 fw-medium">
                          License Number: {userLicenseInfo.number}
                        </p>
                        <p className="text-muted mb-0">
                          Valid Until: 2028-05-15
                        </p>
                      </div>
                      <div
                        style={{
                          width: "120px",
                          height: "70px",
                          backgroundColor: "#eaeaea",
                          borderRadius: "6px",
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-around">
                      <h5 className="me-3 text-center text-md-start mb-3 mb-md-0">
                        Do you have a driver's license or learner's permit?
                      </h5>
                      <div>
                        <button
                          className="btn btn-outline-primary me-2 mb-2 mb-md-0"
                          onClick={() => handleLicenseSelection("license")}
                        >
                          Driver's License
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleLicenseSelection("learners")}
                        >
                          Learner's Permit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bookings and My Vehicles Sections */}
            <div className="row g-4">
              {/* Recent Bookings */}
              <div className="col-md-6">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="card-header text-white py-3"
                    style={{ backgroundColor: "#0066CC" }}
                  >
                    <h4 className="mb-0">Recent Bookings</h4>
                  </div>
                  <div className="card-body p-4">
                    {loadingBookings ? (
                      <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading bookings...</p>
                      </div>
                    ) : userBookings && userBookings.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {userBookings.map((booking, index) => (
                          <li key={index} className="list-group-item py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-medium fs-6">
                                {booking.testType === "LEARNERSLICENSETEST" 
                                  ? "Learner's Test" 
                                  : "Driver's Test"}
                              </span>
                              <div className="text-end">
                                <div className="text-muted small">
                                  {formatDate(booking.testDate)}
                                </div>
                                <div className="text-muted small">
                                  {formatTime(booking.testTime)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 small text-muted">
                              Venue: {booking.testVenue}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted text-center my-4 fs-5">
                        No bookings yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services-section" className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">SERVICES</h2>
              <div
                className="card-header text-white py-3"
                style={{ backgroundColor: "#0066CC" }}
              >
                <h4 className="mb-0">My Vehicles</h4>
              </div>
              <div className="card-body p-4">
                {vehicles && vehicles.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {vehicles.map((vehicle, index) => (
                      <li key={index} className="list-group-item py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-medium fs-6">
                            {index + 1}. {vehicle.vehicleName} ({vehicle.vehicleType}) - {vehicle.vehicleColor}
                          </span>
                          <span className="text-muted">{vehicle.licensePlate}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No vehicles registered yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">TESTIMONIALS</h2>
              <div
                className="mx-auto"
                style={{
                  height: "3px",
                  width: "80px",
                  backgroundColor: "#0d6efd",
                }}
              ></div>
            </div>

            <div className="row g-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                    <div className="text-warning mb-3 fs-5">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="fst-italic mb-4">"{testimonial.text}"</p>
                    <p className="fw-bold text-primary mb-0">
                      {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* License Modal */}
        {showLicenseModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    Enter Your{" "}
                    {licenseType === "license"
                      ? "Driver's License"
                      : "Learner's Permit"}{" "}
                    Number
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowLicenseModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder={`Enter your ${licenseType}`}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowLicenseModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={saveLicenseInfo}
                    disabled={!licenseNumber.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showLicenseModal && <div className="modal-backdrop show"></div>}
      </div>
    </SharedLayout>
  );
}
