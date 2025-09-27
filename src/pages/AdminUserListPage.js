import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function AdminUserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install it.");
        return;
      }
      try {
        setLoading(true);

        // provider can be read-only, but we use BrowserProvider for simplicity
        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        // 1️⃣ Get all user IDs
        const ids = await contract.getAllUserIds();
        console.log("✅ User IDs from blockchain:", ids);

        // 2️⃣ Fetch each user's profile by ID
        const profiles = await Promise.all(
          ids.map(async (id) => {
            try {
              const p = await contract.getProfileById(id);
              return {
                id: id.toString(),
                fullName: p[0].fullName || "N/A",
              };
            } catch (err) {
              console.error(`❌ Error loading profile for ID ${id}:`, err);
              return {
                id: id.toString(),
                fullName: "Error Loading",
              };
            }
          })
        );

        setUsers(profiles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };
console.log("Contract address in frontend:", CONTRACT_ADDRESS);
    fetchUsers();
  }, []);

  return (
    <FormCard title="Admin Dashboard — User List">
      {loading && <p>Loading users...</p>}
      {!loading && users.length === 0 && <p>No users registered yet.</p>}

      {!loading && users.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/admin/${user.id}`)}
            >
              <strong>User ID:</strong> {user.id} <br />
              <strong>Name:</strong> {user.fullName}
            </li>
          ))}
        </ul>
      )}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </FormCard>
  );

}