import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import AdminEditPage from "./admin/AdminEditPage";
import SitePage from "./pages/SitePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin panel */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/edit/:slug" element={<AdminEditPage />} />

        {/* Dynamic site renderer */}
        <Route path="/site/:slug" element={<SitePage />} />

        {/* Root redirect to admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
              <p className="text-4xl font-bold">404</p>
              <p className="text-white/50">Page not found</p>
              <a href="/admin" className="text-sm text-emerald-400 hover:underline">
                ← Go to Admin
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
