// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  Eye,
  Trash2,
  Ticket,
  ClipboardList,
  LogOut,
} from "lucide-react";
import ApiService from "../../services/ApiService";

export default function AdminDashboard() {
  const [data, setData] = useState({
    admins: [],
    applicants: [],
    bookings: [],
    payments: [],
    testAppointments: [],
    vehicleDiscs: [],
    tickets: [],
    registrations: [],
  });
  const [selectedTab, setSelectedTab] = useState("applicants");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminFullName = localStorage.getItem("adminFullName") || "Admin";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getAllData();
      setData(result);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (entity, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      switch (entity) {
        case "applicant":
          await ApiService.deleteApplicant(id);
          break;
        case "booking":
          await ApiService.deleteBooking(id);
          break;
        case "payment":
          await ApiService.deletePayment(id);
          break;
        case "testAppointment":
          await ApiService.deleteTestAppointment(id);
          break;
        case "vehicleDisc":
          await ApiService.deleteVehicleDisc(id);
          break;
        case "ticket":
          await ApiService.deleteTicket(id);
          break;
        default:
          console.warn("Unknown entity for delete:", entity);
      }
      fetchAllData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item. Please try again.");
    }
  };

  const stats = [
    { title: "TOTAL APPLICANTS", value: data.applicants.length, icon: Users, color: "bg-primary" },
    {
      title: "TOTAL REVENUE",
      value: `R ${data.payments.reduce((sum, p) => sum + (p.paymentAmount || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-success",
    },
    {
      title: "PENDING BOOKINGS",
      value: data.bookings.filter((b) => b.status === "PENDING").length,
      icon: Calendar,
      color: "bg-warning",
    },
    {
      title: "COMPLETED PAYMENTS",
      value: data.payments.filter((p) => p.status === "COMPLETED").length,
      icon: FileText,
      color: "bg-info",
    },
    { title: "TEST APPOINTMENTS", value: data.testAppointments.length, icon: ClipboardList, color: "bg-secondary" },
    {
      title: "ACTIVE TICKETS",
      value: data.tickets.filter((t) => t.status === "ACTIVE").length,
      icon: Ticket,
      color: "bg-danger",
    },
  ];

  const filteredApplicants = data.applicants.filter(
    (a) =>
      (a.firstName && a.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.lastName && a.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.email && a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderApplicantsTable = () => (
    <div className="table-responsive" style={{ overflowX: "auto" }}>
      <table className="table table-striped table-bordered text-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Street</th>
            <th>City</th>
            <th>Province</th>
            <th>Postal Code</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((a) => (
              <tr key={a.id || a.userId}>
                <td>{a.id || a.userId}</td>
                <td>{a.firstName}</td>
                <td>{a.lastName}</td>
                <td>{a.email}</td>
                <td>{a.contactNumber}</td>
                <td>{a.street}</td>
                <td>{a.city}</td>
                <td>{a.province}</td>
                <td>{a.postalCode}</td>
                <td>{a.username}</td>
                <td>{"*".repeat(a.password?.length || 0)}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary"><Eye size={16} /></button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete("applicant", a.id || a.userId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">No applicants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderTabContent = () => {
    if (loading)
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading data...</p>
        </div>
      );

    if (error)
      return (
        <div className="alert alert-danger text-center">
          {error}
          <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchAllData}>
            Retry
          </button>
        </div>
      );

    switch (selectedTab) {
      case "applicants":
        return renderApplicantsTable();
      case "bookings":
        return (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.booktype}</td>
                    <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${b.status === "CONFIRMED" ? "bg-success" : "bg-warning"}`}>
                        {b.status || "PENDING"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete("booking", b.bookingId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a tab to view data</div>;
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-green-600 text-gray-900 p-3">
      {/* Top Bar */}
      <div
        className="d-flex justify-content-between align-items-center p-2 mb-3 rounded"
        style={{ background: "linear-gradient(to right, #002395, #ffb612, #007847)" }}
      >
        <h4 className="text-white mb-0">{adminFullName}</h4>
        <button className="btn btn-light btn-sm d-flex align-items-center" onClick={handleLogout}>
          <LogOut className="h-4 w-4 me-1" /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="col-md-6 col-lg-4 col-xl-2 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-between">
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
          );
        })}
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <ul className="nav nav-tabs card-header-tabs flex-wrap">
                {["applicants", "bookings", "payments", "testAppointments", "vehicleDiscs", "tickets"].map((tab) => (
                  <li key={tab} className="nav-item">
                    <button
                      className={`nav-link ${selectedTab === tab ? "active" : ""}`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-body">{renderTabContent()}</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {data.applicants.slice(0, 2).map((a, i) => (
                  <div key={i} className="list-group-item border-0 px-0">
                    <div className="border-start border-primary ps-3">
                      <h6 className="fw-bold mb-1">New applicant registered</h6>
                      <p className="text-muted small mb-1">{a.firstName} {a.lastName}</p>
                      <small className="text-muted">{new Date().toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
                {data.payments.slice(0, 2).map((p, i) => (
                  <div key={i} className="list-group-item border-0 px-0">
                    <div className="border-start border-success ps-3">
                      <h6 className="fw-bold mb-1">Payment received</h6>
                      <p className="text-muted small mb-1">R {p.paymentAmount} via {p.paymentMethod}</p>
                      <small className="text-muted">{new Date(p.paymentDate).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
