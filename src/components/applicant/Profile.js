import React from "react";

const Profile = ({ user }) => {
  if (!user) {
    return <h2>Please log in to view your profile</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Information</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.isApplicant ? "Applicant" : "Admin"}</p>
    </div>
  );
};

export default Profile;
