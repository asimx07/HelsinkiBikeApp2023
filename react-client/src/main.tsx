import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { JourneysList } from "./component/JourneysList";
import { StationList } from "./component/StationList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />) as React.ReactNode,
  },
  {
    path: "/journeys",
    element: (<JourneysList />) as React.ReactNode,
  },
  {
    path: "/stations",
    element: (<StationList />) as React.ReactNode,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
