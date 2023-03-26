import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Protected from "./components/Routes/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
