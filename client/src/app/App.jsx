import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

const router = createBrowserRouter(AppRoutes);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
