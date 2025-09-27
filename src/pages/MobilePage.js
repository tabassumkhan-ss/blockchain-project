import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../FormContext";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function MobilePage() {
  const { update } = useFormData();
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    update({ mobile });
    navigate("/aadhaar");
  };

  return (
    <FormCard title="Mobile Verification">
      <FormInput
        label="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter 10-digit number"
      />
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
           OK
        </button>
        <button
          onClick={() => navigate("/admin-login")}
          style={{
            padding: "10px 20px",
            marginLeft: 10,
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
          Go to Admin Login
        </button>
      </div>
    </FormCard>
  );
}