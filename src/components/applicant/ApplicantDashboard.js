import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SharedLayout from "../sharedPages/SharedLayout";

export default function ApplicantDashboard({ userData, bookings, vehicles }) {
  const navigate = useNavigate();
  const [hasLicense, setHasLicense] = useState(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [userLicenseInfo, setUserLicenseInfo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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
      icon: "📝",
      action: () => navigate("/book-learners-test"),
      requires: null // Available to everyone
    },
    {
      title: "Book Drivers Test",
      description: "Schedule your drivers license test",
      icon: "🚗",
      action: () => navigate("/book-drivers-test"),
      requires: "learners" // Requires learners permit
    },
    {
      title: "Register Vehicle",
      description: "Register your vehicle and get disc",
      icon: "📋",
      action: () => navigate("/VehicleRegistration"),
      requires: null // Available to everyone
    },
    {
      title: "Renew Vehicle Disc",
      description: "Renew your vehicle disc",
      icon: "🔄",
      action: () => navigate("/renew-disc"),
      requires: null // Available to everyone
    },
    {
      title: "Pay Traffic Ticket",
      description: "Pay outstanding traffic fines",
      icon: "💰",
      action: () => navigate("/pay-ticket"),
      requires: null // Available to everyone
    }
  ];

  // Check if user can access a service
  const canAccessService = (service) => {
    if (!service.requires) return true;
    return userLicenseInfo && userLicenseInfo.type === service.requires;
  };

  return (
    <SharedLayout>
      <div className="container mt-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
        {/* Header with strong blue background */}
        <div className="p-4 mb-4 rounded text-white" style={{backgroundColor: "#0066CC"}}>
          <h2 className="mb-2">Welcome, {userData.firstName}</h2>
          <p className="mb-0">Manage your driving licenses, vehicle registration, and traffic services</p>
        </div>
        
        {/* Space between welcome and question */}
        <div className="mb-4"></div>

        {/* License selection prompt */}
        {!userLicenseInfo && (
          <div className="card shadow-sm border-0 mb-5">
            <div className="card-body p-4">
              <h4 className="card-title mb-3 text-dark">Do you have a driver's license or learner's permit?</h4>
              <div className="d-flex gap-3 flex-wrap">
                <button 
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => handleLicenseSelection("license")}
                  style={{minWidth: '180px'}}
                >
                  Driver's License
                </button>
                <button 
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => handleLicenseSelection("learners")}
                  style={{minWidth: '180px'}}
                >
                  Learner's Permit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display current license info if available */}
        {userLicenseInfo && (
          <div className="card shadow-sm border-0 mb-5 bg-light">
            <div className="card-body p-3">
              <h5 className="card-title text-dark mb-1">
                {userLicenseInfo.type === "license" ? "Driver's License" : "Learner's Permit"} Information
              </h5>
              <p className="mb-0">Number: {userLicenseInfo.number}</p>
              <button 
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => setUserLicenseInfo(null)}
              >
                Change License Info
              </button>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="row g-4 mb-5">
          {services.map((service, index) => {
            const disabled = service.requires && !canAccessService(service);
            
            return (
              <div key={index} className="col-md-4">
                <div 
                  className={`card h-100 border-0 p-4 ${disabled ? 'bg-light' : ''}`}
                  style={{ 
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.6 : 1,
                    backgroundColor: 'white',
                    boxShadow: hoveredCard === index ? '0 10px 20px rgba(0, 0, 0, 0.15)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-5px)' : 'none'
                  }}
                  onClick={disabled ? null : service.action}
                  onMouseEnter={() => !disabled && setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="card-body text-center p-3">
                    <div className="mb-3" style={{fontSize: '2.5rem'}}>{service.icon}</div>
                    <h4 className="card-title mb-3" style={{color: "#0066CC"}}>{service.title}</h4>
                    <p className="card-text text-muted">{service.description}</p>
                    {disabled && (
                      <div className="mt-3">
                        <span className="badge bg-warning text-dark">
                          Requires Learner's Permit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Bookings and My Vehicles Sections */}
        <div className="row g-4">
          {/* Recent Bookings */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100" style={{backgroundColor: 'white'}}>
              <div className="card-header text-white py-3" style={{backgroundColor: "#0066CC"}}>
                <h4 className="mb-0">Recent Bookings</h4>
              </div>
              <div className="card-body p-4">
                {bookings && bookings.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {bookings.map((booking, index) => (
                      <li key={index} className="list-group-item py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-medium fs-6">{booking.type}</span>
                          <span className="text-muted">{booking.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted text-center my-4 fs-5">No bookings yet</p>
                )}
              </div>
            </div>
          </div>

          {/* My Vehicles */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100" style={{backgroundColor: 'white'}}>
              <div className="card-header text-white py-3" style={{backgroundColor: "#0066CC"}}>
                <h4 className="mb-0">My Vehicles</h4>
              </div>
              <div className="card-body p-4">
                {vehicles && vehicles.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {vehicles.map((vehicle, index) => (
                      <li key={index} className="list-group-item py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-medium fs-6">{vehicle.make} {vehicle.model}</span>
                          <span className="text-muted">{vehicle.licensePlate}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted text-center my-4 fs-5">No vehicles registered</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* License Information Modal */}
        {showLicenseModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#0066CC", color: "white"}}>
                  <h5 className="modal-title">
                    Enter Your {licenseType === "license" ? "Driver's License" : "Learner's Permit"} Number
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowLicenseModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="licenseNumber" className="form-label">
                      {licenseType === "license" ? "Driver's License" : "Learner's Permit"} Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="licenseNumber"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder={`Enter your ${licenseType === "license" ? "driver's license" : "learner's permit"} number`}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowLicenseModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
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

        {/* Modal Backdrop */}
        {showLicenseModal && <div className="modal-backdrop show"></div>}
      </div>
    </SharedLayout>
  );
}