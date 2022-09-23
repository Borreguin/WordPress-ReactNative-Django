import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AuthenticatedView from "./AuthenticatedView/AuthenticatedView";
import UserBar from "../components/UserBar/UserBar";
import { RenderComponentList } from "./RenderComponentList";

export const routes = [
  {
    path: "/",
    component: <RenderComponentList />,
    description: "Render Component List",
  },
  {
    path: "/login",
    component: <AuthenticatedView />,
    description: "AuthenticatedView",
  },
  {
    path: "/UserBar",
    component: (
      <UserBar onSideBarClick={(status) => console.log("Sidebar", status)} />
    ),
    description: "UserBar",
  },
];

export const routing = (
  <BrowserRouter>
    <Routes>
      {routes.map((route, ix) => (
        <Route key={ix} path={route.path} element={route.component} />
      ))}
    </Routes>
  </BrowserRouter>
);
