// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  Eye,
  Trash2,
  Search,
  MoreVertical
} from "lucide-react";
import ApiService from "../../services/ApiService";

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("applicants");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchApplicants();
    fetchBookings();
    fetchPayments();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await ApiService.getApplicants();
      setApplicants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await ApiService.getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await ApiService.getPayments();
      setPayments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    {
      title: "TOTAL APPLICANTS",
      value: applicants.length,
      icon: Users,
      color: "bg-primary",
    },
    {
      title: "TOTAL REVENUE",
      value: `R ${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-success",
    },
    {
      title: "PENDING BOOKINGS",
      value: bookings.filter((b) => b.status === "PENDING").length,
      icon: Calendar,
      color: "bg-warning",
    },
    {
      title: "COMPLETED PAYMENTS",
      value: payments.filter((p) => p.status === "COMPLETED").length,
      icon: FileText,
      color: "bg-info",
    },
  ];

  const filteredApplicants = applicants.filter(
    (a) =>
      a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample data for bookings as shown in the screenshot
  const bookingItems = [
    {
      type: "Learners Test",
      applicant: "John Doe",
      date: "2024-01-20",
      submitted: "1/15/2024",
      status: "submitted"
    },
    {
      type: "Drivers Test",
      applicant: "Jane Smith",
      date: "2024-01-22",
      submitted: "1/14/2024",
      approved: "1/16/2024",
      status: "approved"
    },
    {
      type: "Learners Test",
      applicant: "Mrs. Lickers",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-green-600 text-gray-900 p-3">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold text-white">Admin Dashboard</h1>
          <p className="text-light mb-0">Manage applicants, bookings, and payments</p>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="col-md-6 col-lg-3 mb-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="text-muted small text-uppercase fw-bold mb-1">{stat.title}</p>
                        <p className="h4 fw-bold text-dark mb-0">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded ${stat.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row">
          {/* Left Panel - Tabs */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${selectedTab === "applicants" ? "active" : ""}`}
                      onClick={() => setSelectedTab("applicants")}
                    >
                      Applicants
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${selectedTab === "bookings" ? "active" : ""}`}
                      onClick={() => setSelectedTab("bookings")}
                    >
                      Bookings
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${selectedTab === "payments" ? "active" : ""}`}
                      onClick={() => setSelectedTab("payments")}
                    >
                      Payments
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {selectedTab === "applicants" && (
                  <div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredApplicants.map((a) => (
                            <tr key={a.userId}>
                              <td>{a.firstName + " " + a.lastName}</td>
                              <td>{a.contact.email}</td>
                              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                              <td>
                                <span className={`badge ${a.license ? "bg-success" : "bg-warning"}`}>
                                  {a.license ? "Has License" : "No License"}
                                </span>
                              </td>
                              <td>
                                <div className="btn-group">
                                  <button className="btn btn-sm btn-outline-primary">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => console.log("Delete", a.userId)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {selectedTab === "bookings" && (
                  <div>
                    <h5 className="card-title mb-4">Bookings</h5>
                    <div className="list-group">
                      {bookingItems.map((booking, index) => (
                        <div key={index} className="list-group-item list-group-item-action">
                          <div className="d-flex w-100 justify-content-between">
                            <div>
                              <h6 className="mb-1 fw-bold">{booking.type}</h6>
                              <p className="mb-1">Applicant: {booking.applicant}</p>
                              {booking.date && <small className="text-muted">Date: {booking.date}</small>}
                              {booking.submitted && <small className="text-muted d-block">Submitted: {booking.submitted}</small>}
                              {booking.approved && <small className="text-muted">Approved: {booking.approved}</small>}
                            </div>
                            <div className="d-flex align-items-center">
                              <span className={`badge me-2 ${
                                booking.status === "approved" 
                                  ? "bg-success" 
                                  : booking.status === "submitted"
                                  ? "bg-primary"
                                  : "bg-warning"
                              }`}>
                                {booking.status}
                              </span>
                              <button className="btn btn-sm btn-outline-secondary">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedTab === "payments" && (
                  <div>
                    <h5 className="card-title mb-4">Payments</h5>
                    <p className="text-muted">Payment management interface will be implemented here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Additional Info */}
          <div className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item border-0 px-0">
                    <div className="border-start border-primary ps-3">
                      <h6 className="fw-bold mb-1">New applicant registered</h6>
                      <p className="text-muted small mb-1">John Doe signed up for driving lessons</p>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0">
                    <div className="border-start border-success ps-3">
                      <h6 className="fw-bold mb-1">Payment received</h6>
                      <p className="text-muted small mb-1">Jane Smith completed payment for learner's test</p>
                      <small className="text-muted">5 hours ago</small>
                    </div>
                  </div>
                  <div className="list-group-item border-0 px-0">
                    <div className="border-start border-warning ps-3">
                      <h6 className="fw-bold mb-1">Booking pending</h6>
                      <p className="text-muted small mb-1">Mrs. Lickers needs schedule confirmation</p>
                      <small className="text-muted">1 day ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}