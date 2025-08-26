// src/services/ApiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstone";



class ApiService {
  // Register a new user


  // Register a new applicant
  static async registerUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/applicants/create`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response || error.message);
      throw error;
    }}
  

  // Login user
  static async loginUser(email, password) {
    try {
      // Call the backend to check login
      const response = await axios.post(`${API_BASE_URL}/applicants/login`, {
        contact: { email },  // match your backend Applicant object
        password,            // user's password
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
      const response = await axios.post(`${API_BASE_URL}/vehicle/create`, vehicleData);
      return response.data;
    } catch (error) {
      console.error("Vehicle registration error:", error.response || error.message);
      throw error;
    }
  }

  // Vehicle Disc endpoints
  static async createVehicleDisc(discData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/vehicledisc/create`, discData);
      return response.data;
    } catch (error) {
      console.error("Vehicle Disc creation error:", error.response || error.message);
      throw error;
    }
  }


  // ...payment methods
  static async createPayment(paymentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/create`, paymentData);
      return response.data;
    } catch (error) {
      console.error("Payment creation error:", error.response || error.message);
      throw error;
    }
  }
}





export default ApiService;
