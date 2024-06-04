import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Note from "@/pages/dashboard/Note";
import DashboardPage from "@/pages/dashboard/page";
import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

export const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [
        { path: "/", element: <DashboardPage /> },
        {
          path: "auth",
          children: [
            { path: "sign-up", element: <SignUp /> },
            { path: "sign-in", element: <SignIn /> },
          ],
        },
        {path:"notes/:id",element:<Note/>}
      ],
    },
  ]);
};
