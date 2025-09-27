import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../FormContext";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function ProfileFormPage() {
  const { data, update } = useFormData();
  const navigate = useNavigate();

  // local state for each input
  const [fullName, setFullName] = useState(data.fullName || "");
  const [email, setEmail] = useState(data.email || "");
  const [country, setCountry] = useState(data.country || "");
  const [state, setState] = useState(data.state || "");
  const [city, setCity] = useState(data.city || "");
  const [address1, setAddress1] = useState(data.address1 || "");
  const [address2, setAddress2] = useState(data.address2 || "");
  const [pincode, setPincode] = useState(data.pincode || "");
  const [referral, setReferral] = useState(data.referral || "");

  const handleRegister = () => {
    // save all entered data to context
    update({
      fullName,
      email,
      country,
      state,
      city,
      address1,
      address2,
      pincode,
      referral,
    });
    // move to Pan Card page
    navigate("/pancard");
  };

  const handleCancel = () => {
    // clear or navigate back (you can change this behaviour)
    navigate("/aadhaar");
  };

  return (
    <FormCard title="Profile Form">
      <FormInput
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="John Doe"
      />
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="john@example.com"
      />
      <FormInput
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <FormInput
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <FormInput
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <FormInput
        label="Address Line 1"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
      />
      <FormInput
        label="Address Line 2"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
      />
      <FormInput
        label="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <FormInput
        label="Referral (Optional)"
        value={referral}
        onChange={(e) => setReferral(e.target.value)}
      />

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={handleRegister}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: "10px 20px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </FormCard>
  );
}