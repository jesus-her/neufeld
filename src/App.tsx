import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import { PeopleAltOutlined, CakeOutlined } from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";

import { Login, Home, createLine1 } from "pages";
import Line1 from "pages/line1/Line1";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {},
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            // {
            //   name: "properties",
            //   list: AllProperties,
            //   show: PropertyDetails,
            //   create: CreateProperty,
            //   edit: EditProperty,
            //   icon: <VillaOutlined />,
            // },
            // {
            //   name: "lots",
            //   list: Lots,
            //   // show: PropertyDetails,
            //   create: CreateLot,
            //   //edit: EditProperty,
            //   icon: <VillaOutlined />,
            // },

            // {
            //   name: "agents",
            //   list: Agents,
            //   show: AgentProfile,
            //   icon: <PeopleAltOutlined />,
            // },
            {
              name: "lines",
              options: { label: "Line #1 " },
              list: Line1,
              create: createLine1,
              icon: <CakeOutlined />,
            },
            // {
            //   name: "reviews",
            //   list: Home,
            //   icon: <StarOutlineRounded />,
            // },
            // {
            //   name: "messages",
            //   list: Home,
            //   icon: <ChatBubbleOutline />,
            // },
            // {
            //   name: "my-profile",
            //   options: { label: "My Profile " },
            //   list: MyProfile,
            //   icon: <AccountCircleOutlined />,
            // },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </>
  );
}

export default App;
