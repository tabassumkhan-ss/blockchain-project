import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../FormContext";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function AadhaarPage() {
  const { update } = useFormData();
  const [aadhaar, setAadhaar] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!/^\d{12}$/.test(aadhaar)) {
      alert("Enter a valid 12-digit Aadhaar number");
      return;
    }
    update({ aadhaar });
    navigate("/profile-form");
  };

  return (
    <FormCard title="Aadhaar Verification">
      <FormInput
        label="Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        placeholder="Enter 12-digit Aadhaar number"
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
          Next
        </button>
      </div>
    </FormCard>
  );
}