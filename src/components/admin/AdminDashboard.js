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
      setData({
        admins: result?.admins || [],
        applicants: result?.applicants || [],
        bookings: result?.bookings || [],
        payments: result?.payments || [],
        testAppointments: result?.testAppointments || [],
        vehicleDiscs: result?.vehicleDiscs || [],
        tickets: result?.tickets || [],
        registrations: result?.registrations || [],
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
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
          setData((prev) => ({
            ...prev,
            applicants: (prev.applicants || []).filter((a) => (a.id || a.userId) !== id),
          }));
          break;
        case "booking":
          await ApiService.deleteBooking(id);
          setData((prev) => ({
            ...prev,
            bookings: (prev.bookings || []).filter((b) => b.bookingId !== id),
          }));
          break;
        case "payment":
          await ApiService.deletePayment(id);
          setData((prev) => ({
            ...prev,
            payments: (prev.payments || []).filter((p) => p.paymentId !== id),
          }));
          break;
        case "testAppointment":
          await ApiService.deleteTestAppointment(id);
          setData((prev) => ({
            ...prev,
            testAppointments: (prev.testAppointments || []).filter(
              (t) => t.testAppointmentId !== id
            ),
          }));
          break;
        case "vehicleDisc":
          await ApiService.deleteVehicleDisc(id);
          setData((prev) => ({
            ...prev,
            vehicleDiscs: (prev.vehicleDiscs || []).filter((v) => v.vehicleDiscId !== id),
          }));
          break;
        case "ticket":
          await ApiService.deleteTicket(id);
          setData((prev) => ({
            ...prev,
            tickets: (prev.tickets || []).filter((t) => t.ticketId !== id),
          }));
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
    { title: "TOTAL APPLICANTS", value: (data.applicants || []).length, icon: Users, color: "bg-primary" },
    {
      title: "TOTAL REVENUE",
      value: `R ${(data.payments || []).reduce((sum, p) => sum + (p.paymentAmount || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-success",
    },
    {
      title: "PENDING BOOKINGS",
      value: (data.bookings || []).filter((b) => b.status === "PENDING").length,
      icon: Calendar,
      color: "bg-warning",
    },
    {
      title: "COMPLETED PAYMENTS",
      value: (data.payments || []).filter((p) => p.status === "COMPLETED").length,
      icon: FileText,
      color: "bg-info",
    },
    {
      title: "TEST APPOINTMENTS",
      value: (data.testAppointments || []).length,
      icon: ClipboardList,
      color: "bg-secondary",
    },
    {
      title: "ACTIVE TICKETS",
      value: (data.tickets || []).filter((t) => t.status === "ACTIVE").length,
      icon: Ticket,
      color: "bg-danger",
    },
  ];

  const filteredApplicants = (data.applicants || []).filter(a =>
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search applicants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
              <th>Country</th>
              <th>Postal Code</th>
              <th>Id NUMBER</th>
              <th>Password</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((a) => (
                <tr key={a.userId}>
                  <td>{a.userId}</td>
                  <td>{a.firstName}</td>
                  <td>{a.lastName}</td>
                  <td>{a.contact?.email || "-"}</td>
                  <td>{a.contact?.cellphone || "-"}</td>
                  <td>{a.address?.street || "-"}</td>
                  <td>{a.address?.city || "-"}</td>
                  <td>{a.address?.province || "-"}</td>
                  <td>{a.address?.country || "-"}</td>
                  <td>{a.address?.postalCode || "-"}</td>
                  <td>{a.idNumber || "-"}</td>
                  <td>{"*".repeat(a.password?.length || 0)}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={a.status || "PENDING"}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        setData((prev) => ({
                          ...prev,
                          applicants: (prev.applicants || []).map((app) =>
                            app.userId === a.userId ? { ...app, status: newStatus } : app
                          ),
                        }));
                        try {
                          const updatedApplicant = (data.applicants || []).find(
                            (app) => app.userId === a.userId
                          );
                          await ApiService.updateApplicantStatus(a.userId, {
                            status: newStatus,
                            reason: updatedApplicant?.reason || "",
                          });
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
                        setData((prev) => ({
                          ...prev,
                          applicants: (prev.applicants || []).map((app) =>
                            app.userId === a.userId ? { ...app, reason: newReason } : app
                          ),
                        }));
                      }}
                      onBlur={async () => {
                        try {
                          const updatedApplicant = (data.applicants || []).find(
                            (app) => app.userId === a.userId
                          );
                          await ApiService.updateApplicantStatus(a.userId, {
                            status: updatedApplicant?.status || "PENDING",
                            reason: updatedApplicant?.reason || "",
                          });
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
                      {renderDeleteButton("applicant", a.userId)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="text-center">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestAppointmentsTable = () => (
    <div className="table-responsive" style={{ overflowX: "auto" }}>
      <table className="table table-striped table-bordered text-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Time</th>
            <th>Result</th>
            <th>License Code</th>
            <th>Test Type</th>
            <th>Amount</th>
            <th>Payment ID</th>
            <th>Applicant ID</th>
            <th>Applicant Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(data.testAppointments || []).length > 0 ? (
            (data.testAppointments || []).map((t) => (
              <tr key={t.testAppointmentId}>
                <td>{t.testAppointmentId}</td>
                <td>{t.testAddress || "-"}</td>
                <td>{t.testVenue || "-"}</td>
                <td>{t.testDate ? new Date(t.testDate).toLocaleDateString() : "-"}</td>
                <td>{t.testTime || "-"}</td>
                <td>{t.testResult === null ? "Pending" : t.testResult ? "Pass" : "Fail"}</td>
                <td>{t.licenseCode || "-"}</td>
                <td>{t.testType || "-"}</td>
                <td>R {t.testAmount?.toFixed(2) || "0.00"}</td>
                <td>{t.payment ? t.payment.paymentId : "N/A"}</td>
                <td>{t.applicant ? t.applicant.userId : "N/A"}</td>
                <td>{t.applicant ? `${(t.applicant.firstName || "")} ${(t.applicant.lastName || "")}`.trim() : "N/A"}</td>
                <td>{renderDeleteButton("testAppointment", t.testAppointmentId)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="text-center">No test appointments found.</td>
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
          <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {(items || []).length > 0 ? (items || []).map((item) => (
            <tr key={item[idField]}>
              {columns.map((col, i) => {
                const key = col.charAt(0).toLowerCase() + col.slice(1);
                let value = item[key];
                if (key === "paymentMethod" && value?.name) value = value.name;
                if (key === "paymentType" && value?.name) value = value.name;
                return <td key={i}>{value || "-"}</td>;
              })}
              <td>{renderDeleteButton(entity, item[idField])}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">No {entity}s found.</td>
            </tr>
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
        return renderGenericTable(data.bookings || [], ["BookingId", "Booktype", "BookingDate", "Status"], "booking", "bookingId");
      case "payments":
        return renderGenericTable(data.payments || [], ["PaymentId", "PaymentAmount", "PaymentMethod", "PaymentType", "Status", "PaymentDate"], "payment", "paymentId");
      case "testAppointments": return renderTestAppointmentsTable();
      case "vehicleDiscs":
        return renderGenericTable(data.vehicleDiscs || [], ["VehicleDiscId", "Vehicle", "DiscNumber", "ExpiryDate"], "vehicleDisc", "vehicleDiscId");
      case "tickets":
        return renderGenericTable(data.tickets || [], ["TicketId", "TicketType", "Status", "IssueDate"], "ticket", "ticketId");
      default: return <div>Select a tab to view data</div>;
    }
  };

  const handleLogout = () => {
    ApiService.logout?.();
    window.location.href = "/";
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
                {["applicants", "bookings", "payments", "testAppointments", "vehicleDiscs", "tickets"].map((tab) => (
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
                {(data.applicants || []).map((a, i) => (
                  <div key={i} className="list-group-item border-0 px-0">
                    <div className="border-start border-primary ps-3">
                      <h6 className="fw-bold mb-1">New applicant registered</h6>
                      <p className="text-muted small mb-1">{a.firstName} {a.lastName}</p>
                      <small className="text-muted">{new Date().toLocaleDateString()}</small>
                    </div>
                  </div>
                ))}
                {(data.testAppointments || []).map((t, i) => (
                  <div key={i} className="list-group-item border-0 px-0">
                    <div className="border-start border-success ps-3">
                      <h6 className="fw-bold mb-1">Test appointment created</h6>
                      <p className="text-muted small mb-1">{t.testType || "Test"}</p>
                      <small className="text-muted">{new Date(t.testDate).toLocaleDateString()}</small>
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
