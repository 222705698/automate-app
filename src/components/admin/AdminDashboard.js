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
      setError(null);
      const result = await ApiService.getAllData();

      if (result && result.timestamp && result.status && result.error) {
        setError(`${result.status} - ${result.error}: ${result.message || ""}`);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        JSON.stringify(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entity, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setDeletingId(id);

    setDeletingId(id);
    try {
      switch (entity) {
        case "applicant":
          await ApiService.deleteApplicant(id);
          setData((prev) => ({
            ...prev,
            applicants: prev.applicants.filter((a) => (a.id || a.userId) !== id),
          }));
          break;
        case "booking":
          await ApiService.deleteBooking(id);
          setData((prev) => ({
            ...prev,
            bookings: prev.bookings.filter((b) => b.bookingId !== id),
          }));
          break;
        case "payment":
          await ApiService.deletePayment(id);
          setData((prev) => ({
            ...prev,
            payments: prev.payments.filter((p) => p.paymentId !== id),
          }));
          break;
        case "testAppointment":
          await ApiService.deleteTestAppointment(id);
          setData((prev) => ({
            ...prev,
            testAppointments: prev.testAppointments.filter(
              (t) => t.testAppointmentId !== id
            ),
          }));
          break;
        case "vehicleDisc":
          await ApiService.deleteVehicleDisc(id);
          setData((prev) => ({
            ...prev,
            vehicleDiscs: prev.vehicleDiscs.filter((v) => v.vehicleDiscId !== id),
          }));
          break;
        case "ticket":
          await ApiService.deleteTicket(id);
          setData((prev) => ({
            ...prev,
            tickets: prev.tickets.filter((t) => t.ticketId !== id),
          }));
          break;
        default:
          console.warn("Unknown entity for delete:", entity);
      }
    } catch (err) {
      console.error("Delete error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        JSON.stringify(err);
      alert(`Failed to delete: ${msg}`);
    } finally {
      setDeletingId(null);
    }
    setDeletingId(null);
  };

  const stats = [
    { title: "TOTAL APPLICANTS", value: data.applicants.length, icon: Users, color: "bg-primary" },
    {
      title: "TOTAL REVENUE",
      value: `R ${data.payments.reduce((sum, p) => sum + (p.paymentAmount || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-success",
    },
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
          <tr>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Contact Number</th>
            <th>Street</th><th>City</th><th>Province</th><th>Postal Code</th><th>Username</th>
            <th>Password</th><th>Status</th><th>Reason</th><th>Actions</th>
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
      case "bookings":
        return (
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
                    <td>
                      <span className={`badge ${b.status === "CONFIRMED" ? "bg-success" : "bg-warning"}`}>
                        {b.status || "PENDING"}
                      </span>
                    </td>
                    <td>{renderDeleteButton("booking", b.bookingId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      // Add payments, testAppointments, vehicleDiscs, tickets tables here
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
        <h4 className="text-white mb-0">Welcome, {adminFullName}</h4>
        <button className="btn btn-sm btn-light" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((s, idx) => (
          <div key={idx} className="col-md-4 col-lg-2 mb-3">
            <div className={`card text-white ${s.color} h-100 shadow`}>
              <div className="card-body d-flex align-items-center">
                <s.icon size={36} className="me-3" />
                <div>
                  <div className="fw-bold">{s.title}</div>
                  <div className="fs-5">{s.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {["applicants","bookings","payments","testAppointments","vehicleDiscs","tickets"].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${selectedTab === tab ? "active" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Search */}
      {selectedTab === "applicants" && (
        <div className="mb-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}