import React, { useState } from "react";

export default function FormInput({
  label,
  value,
  onChange,
  name,
  placeholder,
  readOnly,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type
  let type = "text";
  if (label === "Password") {
    type = showPassword ? "text" : "password";
  } else if (label === "Mobile Number") {
    type = "tel";
  } else if (label === "Aadhaar Number") {
    type = "tel";
  }

  // Max length rules
  let maxLength;
  if (label === "Mobile Number") maxLength = 10;
  if (label === "Aadhaar Number") maxLength = 12;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={readOnly}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            fontSize: "1em",
          }}
        />
        {label === "Password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              marginLeft: -40,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {/* SVG eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="gray"
              viewBox="0 0 16 16"
            >
              {showPassword ? (
                // Eye-slash for "hide"
                <path d="M13.359 11.238l2.122 2.122-.707.707-2.122-2.122a7.973 7.973 0 0 1-4.652 1.555c-3.314 0-6.166-2.07-7.363-5.037a.905.905 0 0 1 0-.634A7.977 7.977 0 0 1 8 3c1.586 0 3.056.467 4.303 1.264l1.558-1.558.707.707-1.558 1.558a8.015 8.015 0 0 1 1.349 1.762c.116.222.116.49 0 .712a7.95 7.95 0 0 1-1.558 2.793zM8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              ) : (
                // Eye for "show"
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}