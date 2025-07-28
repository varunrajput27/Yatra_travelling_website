import "./App.css";
import { useRoutes } from "react-router-dom";
import { useLocation, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user";
import BookingPage from "./pages/Booking";
import PromoPage from "./pages/promo";
import NotFoundPage from "./pages/NotFound";
import CategoryPage from "./pages/category";
import ProfilePage from "./pages/profile";
import HomePage from "./pages/home";
import EditPromoPage from "./pages/editPromo";
import AddPromoPage from "./pages/addPromo";
import Contact from "./components/contact"
import Package from './components/package'
import BookPackage from "./components/bookpackage";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <HomePage />,
  },
   {
    path: "/contactus",
    element: <Contact/>,
  },
   {
    path: "/package",
    element: <Package/>,
  },
  {
    path: "/bookpackage/:id",
    element: <BookPackage/>,
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
        <DashboardPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/booking",
    element: (
      // <ProtectedRoute>
        <BookingPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/promo",
    element: (
      // <ProtectedRoute>
        <PromoPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/addPromo",
    element: (
      // <ProtectedRoute>
        <AddPromoPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/editPromo/:id",
    element: (
      // <ProtectedRoute>
        <EditPromoPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/category",
    element: (
      // <ProtectedRoute>
        <CategoryPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      // <ProtectedRoute>
        <UserPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      // <ProtectedProfile>
        <ProfilePage />
      // </ProtectedProfile>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
