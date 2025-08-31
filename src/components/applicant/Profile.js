import React, { useState } from "react";
import defaultAvatar from "../images/default-avatar.png";
import SharedLayout from "../sharedPages/SharedLayout";
import ApiService from "../../services/ApiService"; // your API service

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    idNumber: user.idNumber || "",
    email: user.contact?.email || "",
    cellphone: user.contact?.cellphone || "",
    street: user.address?.street || "",
    city: user.address?.city || "",
    province: user.address?.province || "",
    country: user.address?.country || "",
    birthDate: user.birthDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        idNumber: formData.idNumber,
        birthDate: formData.birthDate,
        contact: { ...user.contact, email: formData.email, cellphone: formData.cellphone },
        address: { ...user.address, street: formData.street, city: formData.city, province: formData.province, country: formData.country },
      };

      await ApiService.updateApplicant(updatedUser);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const fullAddress = `${formData.street}, ${formData.city}, ${formData.province}, ${formData.country}`;
  const dobString = formData.birthDate ? new Date(formData.birthDate).toLocaleDateString() : "Not provided";

  return (
    <SharedLayout>
      <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: "600px" }}>
        {/* Edit Button */}
        <div className="text-end mb-3">
          <button className="btn btn-outline-secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "✏️ Edit"}
          </button>
        </div>

        {/* Profile Picture */}
        <div className="text-center mb-4">
          <img
            src={user.profilePicture || defaultAvatar}
            alt="Profile"
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        {/* Name & Username */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">{formData.firstName} {formData.lastName}</h3>
          <p className="text-muted">@{user.username || formData.email}</p>
        </div>

        {/* Profile Info */}
        {["firstName", "lastName", "idNumber", "email", "cellphone", "street", "city", "province", "country", "birthDate"].map((field) => (
          <div key={field} className="mb-3 d-flex justify-content-between">
            <strong>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
            {isEditing ? (
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form-control"
                style={{ width: "60%" }}
                type={field === "birthDate" ? "date" : "text"}
              />
            ) : (
              <span>
                {field === "birthDate" ? dobString : formData[field] || "Not provided"}
              </span>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </div>
    </SharedLayout>
  );
};

export default Profile;
