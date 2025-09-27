import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";
import { useFormData } from "../FormContext";

export default function ProfilePage() {
  const { data } = useFormData();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const userId = data.userId || 1;
        const p = await contract.profiles(userId);

        setProfile({
          fullName: p.basic.fullName,
          email: p.basic.email,
          mobile: p.basic.mobile,
          aadhaar: p.basic.aadhaar,
          city: p.addr.city,
          country: p.addr.country,
          pan: p.kyc.pan,
        });
      } catch (err) {
        console.error("Error fetching profile from chain:", err);
      }
    };
    fetchProfile();
  }, []); // runs once

  if (!profile) return <p>Loading profile…</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>User Profile</h2>
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Mobile:</strong> {profile.mobile}</p>
      <p><strong>Aadhaar:</strong> {profile.aadhaar}</p>
      <p><strong>City:</strong> {profile.city}</p>
      <p><strong>Country:</strong> {profile.country}</p>
      <p><strong>PAN:</strong> {profile.pan}</p>
    </div>
  );
}