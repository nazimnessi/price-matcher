import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/features/auth";
import { GoldDashboard } from "@/features/gold/pages/GoldDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <GoldDashboard />,
  },
  {
    path: "/gold",
    element: <GoldDashboard />,
  },
]);
