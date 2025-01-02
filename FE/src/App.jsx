import React from "react";
import HomePage from "./pages/homePage/homePage";
import ListPage from "./pages/listPage/listPage";
import "../src/components/Footer/Footer.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "./pages/layout/layout";
import Login from "./pages/login/login";
import SinglePage from "./pages/singlePage/singlePage";
import SingleNewsPage from "./pages/singlePage/newsSinglePage";
import SignUp from "./pages/signup/signup";
import ProfilePage from "./pages/profile/profilePage";
import NewsPage from "./pages/newsPage/newsPage";
import Company from "./pages/company/Company";
import SingleCompany from "./pages/singleCompany/singleCompany";
import AdminPage from "./pages/adminPage/adminPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OtherProfile from "./pages/otherProfile/otherProfile";
import { use } from "react";
import { logout } from "./lib/utilities";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/sell",
          element: <ListPage />,
        },
        {
          path: "/rent",
          element: <ListPage />,
        },
        {
          path: "/project",
          element: <ListPage />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/news",
          element: <NewsPage />,
        },
        {
          path: "/company",
          element: <Company />,
        },
        {
          path: "/company/:id",
          element: <SingleCompany />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
        {
          path: "/otherProfile",
          element: <OtherProfile />,
        },
        {
          path: "/news/:id",
          element: <SingleNewsPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
