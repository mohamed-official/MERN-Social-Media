import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Protected from "./components/Routes/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/u/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
