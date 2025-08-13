import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadLicense() {
  const [licenseFile, setLicenseFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licenseFile) {
      alert("Please upload your license file.");
      return;
    }
    alert(`License uploaded: ${licenseFile.name}`);
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Upload License Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload License</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setLicenseFile(e.target.files[0])}
            required
          />
        </div>
        <button className="btn btn-info" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}
