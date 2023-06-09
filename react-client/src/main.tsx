import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SingleStation } from "./component/SingleStation.tsx";
import { JourneysList } from "./component/JourneysList";
import { StationsList } from "./component/StationsList.tsx";
import StationForm from "./component/CreateStation.tsx";
import JourneyForm from "./component/CreateJourney.tsx";

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
    element: (<StationsList />) as React.ReactNode,
  },
  {
    path: "/station/:id",
    element: (<SingleStation />) as React.ReactNode,
  },
  {
    path: "/station/create",
    element: <StationForm />,
  },
  {
    path: "/journey/create",
    element: <JourneyForm />,
  },
  {
    path: "*",
    element: (<App />) as React.ReactNode,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
