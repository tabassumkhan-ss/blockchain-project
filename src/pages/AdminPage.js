import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function AdminPage() {
  const { id } = useParams(); // userId from route (/admin/:id)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    aadhaar: "",
    fullName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    pincode: "",
    referral: "",
    pan: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Load user profile by ID
  useEffect(() => {
    const fetchProfile = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const p = await contract.getProfileById(id);

        setForm({
          mobile: p[0].mobile,
          aadhaar: p[0].aadhaar,
          fullName: p[0].fullName,
          email: p[0].email,
          country: p[1].country,
          state: p[1].state,
          city: p[1].city,
          address1: p[1].address1,
          address2: p[1].address2,
          pincode: p[1].pincode,
          referral: p[2].referral,
          pan: p[2].pan,
        });
      } catch (err) {
        console.error("❌ Error loading user profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Validate fields
  const validate = () => {
    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Invalid Mobile: must be 10 digits");
      return false;
    }
    if (!/^\d{12}$/.test(form.aadhaar)) {
      alert("Invalid Aadhaar: must be 12 digits");
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      alert("Invalid PAN format (ABCDE1234F)");
      return false;
    }
    return true;
  };

  // 🔹 Update user profile on-chain
  const onUpdate = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const basic = [form.mobile, form.aadhaar, form.fullName, form.email];
      const addr = [
        form.country,
        form.state,
        form.city,
        form.address1,
        form.address2,
        form.pincode,
      ];
      const kyc = [form.referral, form.pan];

      const tx = await contract.updateProfileById(id, basic, addr, kyc);
      await tx.wait();

      alert(`✅ Profile for User ID ${id} updated successfully`);
      setLoading(false);
      navigate("/admin-user-list"); // back to list
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Transaction failed. See console.");
      setLoading(false);
    }
  };

  return (
    <FormCard title={`Admin Dashboard — Edit User #${id}`}>
      <FormInput label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
      <FormInput label="Aadhaar" name="aadhaar" value={form.aadhaar} onChange={handleChange} />
      <FormInput label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
      <FormInput label="Email" name="email" value={form.email} onChange={handleChange} />
      <FormInput label="Country" name="country" value={form.country} onChange={handleChange} />
      <FormInput label="State" name="state" value={form.state} onChange={handleChange} />
      <FormInput label="City" name="city" value={form.city} onChange={handleChange} />
      <FormInput label="Address 1" name="address1" value={form.address1} onChange={handleChange} />
      <FormInput label="Address 2" name="address2" value={form.address2} onChange={handleChange} />
      <FormInput label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
      <FormInput label="Referral" name="referral" value={form.referral} onChange={handleChange} />
      <FormInput label="PAN" name="pan" value={form.pan} onChange={handleChange} />

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={onUpdate}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          onClick={() => navigate("/admin-user-list")}
          style={{
            padding: "10px 20px",
            marginLeft: 10,
            background: "#6c757d",
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