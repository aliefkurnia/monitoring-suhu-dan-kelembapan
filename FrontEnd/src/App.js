import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ThemeRoutes from "../src/routes/Router.js";
import Loader from "./layouts/loader/Loader";

const App = () => {
  // Simulasi pengecekan status login
  const isLoggedIn = false; // Ganti dengan logika status login sebenarnya

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {ThemeRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element}>
            {route.children?.map((child, index) => (
              <Route key={index} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
        {/* Pengalihan berdasarkan status login */}
        {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
        {isLoggedIn && <Route path="/" element={<Navigate to="/starter" />} />}
      </Routes>
    </Suspense>
  );
};

export default App;
