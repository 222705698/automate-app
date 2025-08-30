// src/services/ApiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstone";

class ApiService {
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
      console.error("Booking creation error:", error.response || error.message);
      throw error;
    }
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

  // Vehicle Disc endpoints
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
  // Fetch all vehicle discs
static async getAllVehicleDiscs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/vehicledisc/getAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle discs:", error.response || error.message);
    throw error;
  }
}
// src/services/ApiService.js

// Fetch expired vehicles from backend
static async getExpiredVehicles() {
  try {
    const response = await axios.get(`${API_BASE_URL}/vehicle/expired`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expired vehicles:", error.response || error.message);
    throw error;
  }
}

}

export default ApiService;
