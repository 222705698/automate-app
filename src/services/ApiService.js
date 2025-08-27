// src/services/ApiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstone";

class ApiService {
  // --- Fetch all data for admin dashboard ---
  static async getAllData() {
    try {
      const [
        admins,
        applicants,
        bookings,
        payments,
        testAppointments,
        vehicleDiscs,
        tickets,
        registrations,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/admins`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/applicants`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/bookings`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/payments`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/test-appointments`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/vehicle-discs`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/tickets`).then((res) => res.data),
        axios.get(`${API_BASE_URL}/registrations`).then((res) => res.data),
      ]);

      return { admins, applicants, bookings, payments, testAppointments, vehicleDiscs, tickets, registrations };
    } catch (error) {
      console.error("Error fetching all data:", error.response || error.message);
      throw error;
    }
  }

  // --- Delete methods for Admin ---
  static deleteApplicant(id) {
    return axios.delete(`${API_BASE_URL}/applicants/${id}`);
  }
  static deleteBooking(id) {
    return axios.delete(`${API_BASE_URL}/bookings/${id}`);
  }
  static deletePayment(id) {
    return axios.delete(`${API_BASE_URL}/payments/${id}`);
  }
  static deleteTestAppointment(id) {
    return axios.delete(`${API_BASE_URL}/test-appointments/${id}`);
  }
  static deleteVehicleDisc(id) {
    return axios.delete(`${API_BASE_URL}/vehicle-discs/${id}`);
  }
  static deleteTicket(id) {
    return axios.delete(`${API_BASE_URL}/tickets/${id}`);
  }

  // --- Logout ---
  static logout() {
    localStorage.clear();
  }

  // --- Applicant Methods ---
  static async registerUser(userData) {
    const response = await axios.post(`${API_BASE_URL}/applicants/create`, userData);
    return response.data;
  }

  static async loginUser(email, password) {
    const response = await axios.post(`${API_BASE_URL}/applicants/login`, { email, password });
    return response.data;
  }

  static async registerVehicle(vehicleData) {
    const response = await axios.post(`${API_BASE_URL}/vehicle/create`, vehicleData);
    return response.data;
  }

  static async createVehicleDisc(discData) {
    const response = await axios.post(`${API_BASE_URL}/vehicledisc/create`, discData);
    return response.data;
  }

  static async createPayment(paymentData) {
    const response = await axios.post(`${API_BASE_URL}/payment/create`, paymentData);
    return response.data;
  }

  static async createTestAppointment(appointmentData) {
    const response = await axios.post(`${API_BASE_URL}/test-appointments/create`, appointmentData);
    return response.data;
  }
}

export default ApiService;
