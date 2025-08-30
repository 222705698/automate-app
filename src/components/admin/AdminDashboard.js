// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  Calendar,
  FileText,
  ClipboardList,
  Ticket,
  Eye,
  Trash2,
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
  const [deletingId, setDeletingId] = useState(null);

  const adminFullName = localStorage.getItem("adminFullName") || "Admin";

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getAllData();
      
      // Check if the result is a Spring Boot error response
      if (result && typeof result === 'object') {
        if (result.timestamp && result.status && result.error) {
          // This is a Spring Boot error response
          setError(`Server Error ${result.status}: ${result.error}`);
        } else {
          // This is a successful response with data
          setData(result);
        }
      } else {
        setData(result);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      // Handle different error formats
      let errorMessage = "Failed to load data. Please try again later.";
      
      if (err.response?.data) {
        // Handle Spring Boot error response format
        if (typeof err.response.data === 'object') {
          if (err.response.data.error) {
            errorMessage = `Server Error: ${err.response.data.error}`;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleDelete = async (entity, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setDeletingId(id);
    try {
      switch (entity) {
        case "applicant":
          await ApiService.deleteApplicant(id);
          setData(prev => ({ ...prev, applicants: prev.applicants.filter(a => (a.id || a.userId) !== id) }));
          break;
        case "booking":
          await ApiService.deleteBooking(id);
          setData(prev => ({ ...prev, bookings: prev.bookings.filter(b => b.bookingId !== id) }));
          break;
        case "payment":
          await ApiService.deletePayment(id);
          setData(prev => ({ ...prev, payments: prev.payments.filter(p => p.paymentId !== id) }));
          break;
        case "testAppointment":
          await ApiService.deleteTestAppointment(id);
          setData(prev => ({ ...prev, testAppointments: prev.testAppointments.filter(t => t.testAppointmentId !== id) }));
          break;
        case "vehicleDisc":
          await ApiService.deleteVehicleDisc(id);
          setData(prev => ({ ...prev, vehicleDiscs: prev.vehicleDiscs.filter(v => v.vehicleDiscId !== id) }));
          break;
        case "ticket":
          await ApiService.deleteTicket(id);
          setData(prev => ({ ...prev, tickets: prev.tickets.filter(t => t.ticketId !== id) }));
          break;
        default:
          console.warn("Unknown entity for delete:", entity);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item. Please try again.");
    }
    setDeletingId(null);
  };

  const stats = [
    { title: "TOTAL APPLICANTS", value: data.applicants.length, icon: Users, color: "bg-primary" },
    { title: "TOTAL REVENUE", value: `R ${data.payments.reduce((sum, p) => sum + (p.paymentAmount || 0), 0).toLocaleString()}`, icon: DollarSign, color: "bg-success" },
    { title: "PENDING BOOKINGS", value: data.bookings.filter((b) => b.status === "PENDING").length, icon: Calendar, color: "bg-warning" },
    { title: "COMPLETED PAYMENTS", value: data.payments.filter((p) => p.status === "COMPLETED").length, icon: FileText, color: "bg-info" },
    { title: "TEST APPOINTMENTS", value: data.testAppointments.length, icon: ClipboardList, color: "bg-secondary" },
    { title: "ACTIVE TICKETS", value: data.tickets.filter((t) => t.status === "ACTIVE").length, icon: Ticket, color: "bg-danger" },
  ];

  const filteredApplicants = data.applicants.filter(
    (a) =>
      (a.firstName && a.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.lastName && a.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.email && a.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderDeleteButton = (entity, id) => (
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => handleDelete(entity, id)}
      disabled={deletingId === id}
    >
      {deletingId === id ? "Deleting..." : <Trash2 size={16} />}
    </button>
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
          <th>Status</th>
          <th>Reason</th>
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
                <select
                  className="form-select form-select-sm"
                  value={a.status || "PENDING"}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      await ApiService.updateApplicantStatus(a.id || a.userId, { status: newStatus, reason: a.reason });
                      setData(prev => ({
                        ...prev,
                        applicants: prev.applicants.map(app =>
                          (app.id === a.id || app.userId === a.userId ? { ...app, status: newStatus } : app)
                        )
                      }));
                    } catch (err) {
                      console.error("Error updating status:", err);
                      alert("Failed to update status.");
                    }
                  }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Reason (optional)"
                  value={a.reason || ""}
                  onChange={(e) => {
                    const newReason = e.target.value;
                    setData(prev => ({
                      ...prev,
                      applicants: prev.applicants.map(app =>
                        (app.id === a.id || app.userId === a.userId ? { ...app, reason: newReason } : app)
                      )
                    }));
                  }}
                  onBlur={async () => {
                    try {
                      await ApiService.updateApplicantStatus(a.id || a.userId, { status: a.status, reason: a.reason });
                    } catch (err) {
                      console.error("Error updating reason:", err);
                    }
                  }}
                />
              </td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-primary">
                    <Eye size={16} />
                  </button>
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
            <td colSpan="14" className="text-center">No applicants found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);


  const renderGenericTable = (items, columns, entity, idField) => (
    <div className="table-responsive">
      <table className="table table-striped table-bordered text-sm">
        <thead className="table-dark">
          <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {items.length > 0 ? items.map(item => (
            <tr key={item[idField]}>
              {columns.map((col, i) => <td key={i}>{item[col.toLowerCase()] || item[col.toLowerCase()]}</td>)}
              <td>{renderDeleteButton(entity, item[idField])}</td>
            </tr>
          )) : (
            <tr><td colSpan={columns.length + 1} className="text-center">No {entity}s found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderTabContent = () => {
    if (loading) return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading data...</p>
      </div>
    );

    if (error) return (
      <div className="alert alert-danger text-center">
        {error}
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={fetchAllData}>Retry</button>
      </div>
    );

    switch (selectedTab) {
      case "applicants": return renderApplicantsTable();
      case "bookings": return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.map(b => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.booktype}</td>
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                  <td><span className={`badge ${b.status === "CONFIRMED" ? "bg-success" : "bg-warning"}`}>{b.status || "PENDING"}</span></td>
                  <td>{renderDeleteButton("booking", b.bookingId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      case "payments": return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-sm">
            <thead className="table-dark">
              <tr><th>ID</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.payments.map(p => (
                <tr key={p.paymentId}>
                  <td>{p.paymentId}</td>
                  <td>R {p.paymentAmount}</td>
                  <td>{p.paymentMethod}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>{renderDeleteButton("payment", p.paymentId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      case "testAppointments": return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-sm">
            <thead className="table-dark">
              <tr><th>ID</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.testAppointments.map(t => (
                <tr key={t.testAppointmentId}>
                  <td>{t.testAppointmentId}</td>
                  <td>{new Date(t.testDate).toLocaleDateString()}</td>
                  <td>{t.status}</td>
                  <td>{renderDeleteButton("testAppointment", t.testAppointmentId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      case "vehicleDiscs": return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-sm">
            <thead className="table-dark">
              <tr><th>ID</th><th>Vehicle</th><th>Disc Number</th><th>Expiry Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.vehicleDiscs.map(v => (
                <tr key={v.vehicleDiscId}>
                  <td>{v.vehicleDiscId}</td>
                  <td>{v.vehicle?.vehicleNumber}</td>
                  <td>{v.discNumber}</td>
                  <td>{new Date(v.expiryDate).toLocaleDateString()}</td>
                  <td>{renderDeleteButton("vehicleDisc", v.vehicleDiscId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      case "tickets": return (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-sm">
            <thead className="table-dark">
              <tr><th>ID</th><th>Type</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.tickets.map(t => (
                <tr key={t.ticketId}>
                  <td>{t.ticketId}</td>
                  <td>{t.ticketType}</td>
                  <td>{t.status}</td>
                  <td>{new Date(t.issueDate).toLocaleDateString()}</td>
                  <td>{renderDeleteButton("ticket", t.ticketId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      default: return <div>Select a tab to view data</div>;
    }
  };

  const handleLogout = () => {
    ApiService.logout?.();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-green-600 text-gray-900 p-3">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center p-2 mb-3 rounded" style={{ background: "linear-gradient(to right, #002395, #ffb612, #007847)" }}>
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
                {["applicants", "bookings", "payments", "testAppointments", "vehicleDiscs", "tickets"].map(tab => (
                  <li key={tab} className="nav-item">
                    <button className={`nav-link ${selectedTab === tab ? "active" : ""}`} onClick={() => setSelectedTab(tab)}>
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