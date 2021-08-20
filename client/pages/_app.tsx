import React from "react";
import ProtectRoute from "../components/auth/protect-route";
import LayoutApp from "../components/layout/layout-app";
import StoreContext from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StoreContext>
      <LayoutApp>
        {/* <ProtectRoute> */}
        <Component {...pageProps} />
        {/* </ProtectRoute> */}
      </LayoutApp>
    </StoreContext>
  );
}

export default MyApp;
