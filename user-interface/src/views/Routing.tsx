import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AuthenticatedView from "./AuthenticatedView/AuthenticatedView";
import UserBar from "../components/UserBar/UserBar";
import RenderComponentList from "./RenderComponentList";
import SideBar from "../components/SideBar/SideBar";
import ItemStack from "../components/common/ItemStack/ItemStack";
import {
  itemStackData,
  sectionListData1,
  sideBarData,
} from "./DataComponentList";
import Section from "../components/SideBar/Section/Section";

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
      <UserBar onSideBarClick={(status) => console.log("SideBar", status)} />
    ),
    description: "UserBar",
  },
  {
    path: "/ItemStack",
    component: (
      <ItemStack
        iconName={itemStackData.iconName}
        itemName={itemStackData.itemName}
        selected={itemStackData.selected}
        onPress={itemStackData.onPress}
        badgeColorScheme={itemStackData.badgeColorScheme}
        badgeMsg={itemStackData.badgeMsg}
        badgeVariant={itemStackData.badgeVariant}
        background={itemStackData.background}
        textColor={itemStackData.textColor}
      />
    ),
    description: "ItemStack",
  },
  {
    path: "/Section",
    component: <Section items={sectionListData1} />,
    description: "Section",
  },
  {
    path: "/SideBar",
    component: <SideBar sections={sideBarData} />,
    description: "SideBar",
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
