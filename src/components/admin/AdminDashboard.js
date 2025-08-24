import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('applicants');

  useEffect(() => {
    // Mock data
    setApplicants([
      { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2024-01-10', hasLearners: true },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2024-01-12', hasDrivers: true },
    ]);

    setPayments([
      { id: 1, userId: 'user1', amount: 250, type: 'Learners Test', date: '2024-01-15', status: 'completed' },
      { id: 2, userId: 'user2', amount: 450, type: 'Drivers Test', date: '2024-01-14', status: 'pending' },
    ]);

    setBookings([
      { id: 1, userId: 'user1', userName: 'John Doe', type: 'Learners Test', date: '2024-01-20', status: 'pending', submittedAt: '2024-01-15T10:00:00Z' },
      { id: 2, userId: 'user2', userName: 'Jane Smith', type: 'Drivers Test', date: '2024-01-22', status: 'approved', submittedAt: '2024-01-14T14:30:00Z', approvedAt: '2024-01-16T09:15:00Z' },
    ]);
  }, []);

  const handleDeleteApplicant = (id) => {
    if (window.confirm('Delete this applicant?')) setApplicants(applicants.filter(a => a.id !== id));
  };

  const handleApproveBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'approved', approvedAt: new Date().toISOString() } : b));
  };

  const handleDeclineBooking = (id) => {
    const reason = window.prompt('Reason for declining?');
    if (!reason) return;
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'declined', declinedAt: new Date().toISOString(), declineReason: reason } : b));
  };

  const filteredApplicants = applicants.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Total Applicants', value: applicants.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Revenue', value: `R ${payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-green-600' },
    { title: 'Pending Bookings', value: bookings.filter(b => b.status === 'pending').length, icon: Calendar, color: 'from-yellow-500 to-orange-500' },
    { title: 'Completed Payments', value: payments.filter(p => p.status === 'completed').length, icon: FileText, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage applicants, bookings, and payments</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {['applicants','bookings','payments'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 ${
                  selectedTab===tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 space-y-6">
          {/* Applicants Table */}
          {selectedTab==='applicants' && (
            <div className="bg-gray-50 rounded-2xl shadow p-6">
              <div className="mb-4 relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={e=>setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplicants.map(a => (
                      <tr key={a.id} className="hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-4">{a.name}</td>
                        <td className="px-6 py-4">{a.email}</td>
                        <td className="px-6 py-4">{new Date(a.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-800"><Eye /></button>
                          <button className="text-red-600 hover:text-red-800" onClick={()=>handleDeleteApplicant(a.id)}><Trash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings */}
          {selectedTab==='bookings' && (
            <div className="bg-gray-50 rounded-2xl shadow p-6 space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition-shadow duration-200">
                  <div>
                    <h3 className="text-lg font-medium">{b.type}</h3>
                    <p className="text-gray-500 text-sm">Applicant: {b.userName}</p>
                    <p className="text-gray-500 text-sm">Date: {b.date}</p>
                    <p className="text-gray-500 text-sm">Submitted: {new Date(b.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      b.status==='pending'?'bg-yellow-100 text-yellow-800':
                      b.status==='approved'?'bg-green-100 text-green-800':'bg-red-100 text-red-800'
                    }`}>{b.status}</span>
                    {b.status==='pending' && <>
                      <button onClick={()=>handleApproveBooking(b.id)} className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"><CheckCircle className="h-4 w-4 mr-1"/>Approve</button>
                      <button onClick={()=>handleDeclineBooking(b.id)} className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"><XCircle className="h-4 w-4 mr-1"/>Decline</button>
                    </>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payments */}
          {selectedTab==='payments' && (
            <div className="bg-gray-50 rounded-2xl shadow p-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4">R {p.amount}</td>
                      <td className="px-6 py-4">{p.type}</td>
                      <td className="px-6 py-4">{p.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          p.status==='completed'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'
                        }`}>{p.status}</span>
                      </td>
                      <td className="px-6 py-4">{p.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
