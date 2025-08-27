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
//  static API_BASE_URL = "http://localhost:8080/api/test-appointments";

  // Create a new test appointment
  static async createTestAppointment(appointmentData) {
    try {
      const response = await axios.post(
        `${this.API_BASE_URL}/create`,
        appointmentData
      );
      return response.data;
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

  // Register a new user

  // Register a new applicant
static async registerUser(userData) {
  try {
    const url =
      userData.role === "ADMIN"
        ? `${API_BASE_URL}/admins/create`
        : `${API_BASE_URL}/applicants/create`;

    const response = await axios.post(url, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response || error.message);
    throw error;
  }
}

  // Login user
  static async loginUser(email, password) {
    const response = await axios.post(`${API_BASE_URL}/applicants/login`, { email, password });
    return response.data;
    try {
      // Call the backend to check login
      const response = await axios.post(`${API_BASE_URL}/applicants/login`, {
        contact: { email }, // match your backend Applicant object
        password, // user's password
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      throw error;
    }
  }

  static async loginAdmin(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/admins/login`, {
        contact: { email },
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      throw error;
    }
  }


  // Vehicle endpoints
  static async registerVehicle(vehicleData) {
    try {
      if (!vehicleData.applicant || !vehicleData.applicant.userId) {
        throw new Error("User not logged in");
      }
      const response = await axios.post(
        `${API_BASE_URL}/vehicle/create`,
        vehicleData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Vehicle registration error:",
        error.response || error.message
      );
      throw error;
    }
  }

  static async createVehicleDisc(discData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/vehicledisc/create`,
        discData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Vehicle Disc creation error:",
        error.response || error.message
      );
      throw error;
    }
  }

  // ...payment methods
  static async createPayment(paymentData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payment/create`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error("Payment creation error:", error.response || error.message);
      throw error;
    }
  }
}

export default ApiService;
