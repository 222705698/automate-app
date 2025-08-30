// src/services/ApiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstone";

class ApiService {
  // Create a new test appointment - FIXED METHOD NAME
static async createTestAppointment(appointmentData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/test-appointments/create`, 
      appointmentData
    );
    console.log("Appointment created successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Booking creation error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

  // Registegitr a new applicant
  static async registerUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/applicants/create`, userData);
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

  // Payment method
static async createPayment(paymentData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/payments/create`,  // Note the 's' in payments
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Payment creation error:", error.response?.data || error.message);
    throw error;
  }
}
}

export default ApiService;
