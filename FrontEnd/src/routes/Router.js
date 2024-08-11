import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout")); // Layout tanpa sidebar dan header

/***** Pages ****/
const Login = lazy(() => import("../views/Login"));
const Starter = lazy(() => import("../views/Starter"));
const About = lazy(() => import("../views/About"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Controller = lazy(() => import("../views/ui/Controller"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> }, // Arahkan ke halaman login saat pertama kali dibuka
      { path: "/starter", element: <Starter /> },
      { path: "/about", element: <About /> },
      { path: "/table", element: <Tables /> },
      { path: "/controller", element: <Controller /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />, // Gunakan layout untuk login
    children: [{ path: "/login", element: <Login /> }],
  },
];

export default ThemeRoutes;
