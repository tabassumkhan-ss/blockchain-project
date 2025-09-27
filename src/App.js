import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./FormContext";

import MobilePage from "./pages/MobilePage";
import AadhaarPage from "./pages/AadhaarPage";
import ProfileFormPage from "./pages/ProfileFormPage";
import PanCardPage from "./pages/PanCardPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage"; 
import AdminDashboardPage from "./pages/AdminDashboardPage"; 
import AdminUserListPage from "./pages/AdminUserListPage";


export default function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          {/* Registration Flow */}
          <Route path="/" element={<MobilePage />} />
          <Route path="/aadhaar" element={<AadhaarPage />} />
          <Route path="/profile-form" element={<ProfileFormPage />} />
          <Route path="/pancard" element={<PanCardPage />} />
          <Route path="/profile-view" element={<ProfilePage />} />

          {/* Admin Flow */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/adminuserlistpage" element={<AdminUserListPage/>}/>

          {/* Default Fallback */}
           <Route path="*" element={<MobilePage />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}