import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SubjectsPage from "./pages/Subjects/SubjectsPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import TasksPage from "./pages/Tasks/TasksPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
          <Route path="/projects/:subjectId" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/project/:projectId/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
