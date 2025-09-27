import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function AdminDashboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!window.ethereum) {
          alert("MetaMask is required to view user profiles");
          return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("✅ Connected wallet:", await signer.getAddress());

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        // Get all user IDs from contract
        const ids = await contract.getAllUserIds();
        console.log("✅ User IDs from blockchain:", ids);

        const fetched = [];
        for (const id of ids) {
          try {
            // Fetch each profile directly from public mapping
            const p = await contract.profiles(id);

            // Flatten struct
            fetched.push({
              id: id.toString(),
              fullName: p.basic.fullName,
              email: p.basic.email,
              mobile: p.basic.mobile,
              aadhaar: p.basic.aadhaar,
              city: p.addr.city,
              country: p.addr.country,
              pan: p.kyc.pan,
            });
          } catch (err) {
            console.error(`❌ Error loading profile for ID ${id}:`, err);
          }
        }

        setProfiles(fetched);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading profiles…</p>;

  if (profiles.length === 0)
    return <p style={{ padding: 20 }}>No profiles found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard — User Profiles</h2>
      {profiles.map((u) => (
        <div
          key={u.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 15,
            marginBottom: 15,
          }}
        >
          <h3>
            User ID: {u.id} — {u.fullName || "(no name)"}
          </h3>
          <p>
            <strong>Email:</strong> {u.email}
          </p>
          <p>
            <strong>Mobile:</strong> {u.mobile}
          </p>
          <p>
            <strong>Aadhaar:</strong> {u.aadhaar}
          </p>
          <p>
            <strong>City:</strong> {u.city} | <strong>Country:</strong>{" "}
            {u.country}
          </p>
          <p>
            <strong>PAN:</strong> {u.pan}
          </p>
        </div>
      ))}
    </div>
  );
}