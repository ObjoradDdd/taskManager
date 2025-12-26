import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ModalProvider } from "./components/Modal/ModalProvider";


import ProtectedRoute from "./components/ProtectedRoute";

// AUTH
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";


// SUBJECT
import AdminSubjectsListPage from "./pages/subjects/AdminSubjectsListPage";
import MemberSubjectsListPage from "./pages/subjects/MemberSubjectsListPage";
import SubjectPage from "./pages/subjects/SubjectPage";


// PROJECTS
import ProjectPage from "./pages/projects/ProjectPage";
import Layout from "./components/Layout/Layout";


// TASKS



export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>

          {/* AUTH (NO LAYOUT) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PAGES WITH LAYOUT */}
          <Route element={<Layout />}>
            <Route
              path="/admin_subjects"
              element={
                <ProtectedRoute>
                  <AdminSubjectsListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member_subjects"
              element={
                <ProtectedRoute>
                  <MemberSubjectsListPage />
                </ProtectedRoute>
              }
            />
            <Route path="/subjects/:subjectId" element={<SubjectPage />} />
            <Route
              path="/subjects/:subjectId/projects/:projectId"
              element={<ProjectPage />}
            />
          </Route>

          {/* DEFAULT */}
          <Route path="*" element={<Navigate to="/admin_subjects" replace />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
}


