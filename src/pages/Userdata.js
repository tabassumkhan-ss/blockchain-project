import React, { useEffect, useState } from "react";
import { useFormData } from "../FormContext";   // ✅ use hook
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";
import { BrowserProvider, Contract } from "ethers";

// ✅ deployed MST Testnet contract address
const CONTRACT_ADDRESS = "0x89d2bF51A7b012142C3160e001f7901bb30b658A";

// ✅ ABI for getProfile function
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "string", "name": "mobile", "type": "string" },
          { "internalType": "string", "name": "aadhaar", "type": "string" },
          { "internalType": "string", "name": "fullName", "type": "string" },
          { "internalType": "string", "name": "email", "type": "string" }
        ],
        "internalType": "struct Registration.BasicInfo",
        "name": "basic",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "country", "type": "string" },
          { "internalType": "string", "name": "state", "type": "string" },
          { "internalType": "string", "name": "city", "type": "string" },
          { "internalType": "string", "name": "address1", "type": "string" },
          { "internalType": "string", "name": "address2", "type": "string" },
          { "internalType": "string", "name": "pincode", "type": "string" }
        ],
        "internalType": "struct Registration.AddressInfo",
        "name": "addr",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "referral", "type": "string" },
          { "internalType": "string", "name": "pan", "type": "string" }
        ],
        "internalType": "struct Registration.KycInfo",
        "name": "kyc",
        "type": "tuple"
      }
    ],
    "name": "registerProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "mobile", "type": "string" },
          { "internalType": "string", "name": "aadhaar", "type": "string" },
          { "internalType": "string", "name": "fullName", "type": "string" },
          { "internalType": "string", "name": "email", "type": "string" }
        ],
        "internalType": "struct Registration.BasicInfo",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "country", "type": "string" },
          { "internalType": "string", "name": "state", "type": "string" },
          { "internalType": "string", "name": "city", "type": "string" },
          { "internalType": "string", "name": "address1", "type": "string" },
          { "internalType": "string", "name": "address2", "type": "string" },
          { "internalType": "string", "name": "pincode", "type": "string" }
        ],
        "internalType": "struct Registration.AddressInfo",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "referral", "type": "string" },
          { "internalType": "string", "name": "pan", "type": "string" }
        ],
        "internalType": "struct Registration.KycInfo",
        "name": "",
        "type": "tuple"
      },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "getProfileById",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "mobile", "type": "string" },
          { "internalType": "string", "name": "aadhaar", "type": "string" },
          { "internalType": "string", "name": "fullName", "type": "string" },
          { "internalType": "string", "name": "email", "type": "string" }
        ],
        "internalType": "struct Registration.BasicInfo",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "country", "type": "string" },
          { "internalType": "string", "name": "state", "type": "string" },
          { "internalType": "string", "name": "city", "type": "string" },
          { "internalType": "string", "name": "address1", "type": "string" },
          { "internalType": "string", "name": "address2", "type": "string" },
          { "internalType": "string", "name": "pincode", "type": "string" }
        ],
        "internalType": "struct Registration.AddressInfo",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "referral", "type": "string" },
          { "internalType": "string", "name": "pan", "type": "string" }
        ],
        "internalType": "struct Registration.KycInfo",
        "name": "",
        "type": "tuple"
      },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllUserIds",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      {
        "components": [
          { "internalType": "string", "name": "mobile", "type": "string" },
          { "internalType": "string", "name": "aadhaar", "type": "string" },
          { "internalType": "string", "name": "fullName", "type": "string" },
          { "internalType": "string", "name": "email", "type": "string" }
        ],
        "internalType": "struct Registration.BasicInfo",
        "name": "basic",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "country", "type": "string" },
          { "internalType": "string", "name": "state", "type": "string" },
          { "internalType": "string", "name": "city", "type": "string" },
          { "internalType": "string", "name": "address1", "type": "string" },
          { "internalType": "string", "name": "address2", "type": "string" },
          { "internalType": "string", "name": "pincode", "type": "string" }
        ],
        "internalType": "struct Registration.AddressInfo",
        "name": "addr",
        "type": "tuple"
      },
      {
        "components": [
          { "internalType": "string", "name": "referral", "type": "string" },
          { "internalType": "string", "name": "pan", "type": "string" }
        ],
        "internalType": "struct Registration.KycInfo",
        "name": "kyc",
        "type": "tuple"
      }
    ],
    "name": "updateProfileById",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
  ];

export default function ProfilePage() {
  const { data } = useFormData();   // ✅ correct usage
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!window.ethereum || !data.walletAddress) return;
      try {
        const provider = new BrowserProvider(window.ethereum, {
          chainId: 4545,
          name: "mst-testnet",
        });
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const p = await contract.getProfile(data.walletAddress);

        setProfile({
          mobile: p[0][0],
          aadhaar: p[0][1],
          fullName: p[0][2],
          email: p[0][3],
          country: p[1][0],
          state: p[1][1],
          city: p[1][2],
          address1: p[1][3],
          address2: p[1][4],
          pincode: p[1][5],
          referral: p[2][0],
          pan: p[2][1],
          registeredAt: p[3]
            ? new Date(Number(p[3]) * 1000).toLocaleString()
            : null,
        });
      } catch (err) {
        console.error("Error fetching profile from chain:", err);
      }
    };

    fetchProfile();
  }, [data.walletAddress]);

  const display = profile || data;

  return (
    <FormCard title="User Profile">
      <FormInput label="Wallet Address" value={data.walletAddress || "Not connected"} readOnly />
      <FormInput label="Mobile" value={display.mobile} readOnly />
      <FormInput label="Aadhaar" value={display.aadhaar} readOnly />
      <FormInput label="Full Name" value={display.fullName} readOnly />
      <FormInput label="Country" value={display.country} readOnly />
      <FormInput label="State" value={display.state} readOnly />
      <FormInput label="City" value={display.city} readOnly />
      <FormInput label="Address Line 1" value={display.address1} readOnly />
      <FormInput label="Address Line 2" value={display.address2} readOnly />
      <FormInput label="Pin Code" value={display.pincode} readOnly />
      <FormInput label="Referral Code" value={display.referral} readOnly />
      <FormInput label="Password" value={display.password} readOnly />
      <FormInput label="Email" value={display.email} readOnly />
      <FormInput label="PAN" value={display.pan} readOnly />

      {display.registeredAt && (
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: "0.9em",
            color: "#555",
          }}
        >
          <strong>Registered At:</strong> {display.registeredAt}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Go To Home
        </button>
      </div>
    </FormCard>
  );
}