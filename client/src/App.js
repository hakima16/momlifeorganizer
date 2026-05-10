import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";
import ActivitiesPage from "./pages/ActivitiesPage";

import AppointmentsPage from "./pages/AppointmentsPage";
import CleaningPage from "./pages/CleaningPage";
import ShoppingPage from "./pages/ShoppingPage";
import VacationsPage from "./pages/VacationsPage";

// 🔒 FIXED ProtectedRoute — prevents flashing + disappearing
function ProtectedRoute({ children }) {
  const [ready, setReady] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(stored);
    setReady(true);
  }, []);

  // ⛔ Prevents instant redirect before localStorage loads
  if (!ready) return null;

  return loggedIn ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* HOME PAGE */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* KIDS PAGE */}
        <Route
          path="/kids"
          element={
            <ProtectedRoute>
              <KidsPage />
            </ProtectedRoute>
          }
        />

        {/* ACTIVITIES PAGE */}
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivitiesPage />
            </ProtectedRoute>
          }
        />

        {/* APPOINTMENTS PAGE */}
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        {/* CLEANING PAGE */}
        <Route
          path="/cleaning"
          element={
            <ProtectedRoute>
              <CleaningPage />
            </ProtectedRoute>
          }
        />

        {/* SHOPPING PAGE */}
        <Route
          path="/shopping"
          element={
            <ProtectedRoute>
              <ShoppingPage />
            </ProtectedRoute>
          }
        />

        {/* VACATIONS PAGE */}
        <Route
          path="/vacations"
          element={
            <ProtectedRoute>
              <VacationsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;


