import { Layout } from "antd";
import { useRouter } from "next/router";

import React, { FC, useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth.context";

import HeaderBar from "./header-bar";
import SiderBar from "./sider-bar";

const LayoutApp: FC = ({ children }) => {
  const [routeAmdin, setRouteAmdin] = useState<string | undefined>();
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname.split("/");
    const _routeAdmin = pathname[1];
    _routeAdmin === "admin" ? setRouteAmdin(_routeAdmin) : setRouteAmdin(undefined);
  }, [router]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Layout>
        {routeAmdin && <SiderBar />}
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
