import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import EmployeesPage from "../pages/EmployeesPage";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage";
import CreateEmployeePage from "../pages/CreateEmployeePage";
import EditEmployeePage from "../pages/EditEmployeePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
        <Route path="/employees/create" element={<CreateEmployeePage />} />
        <Route path="/employees/edit/:id" element={<EditEmployeePage />} />

        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
