import React from "react";
import ProtectRoute from "../components/auth/protect-route";
import LayoutApp from "../components/layout/layout-app";
import StoreContext from "../context";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext>
        <LayoutApp>
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </LayoutApp>
      </StoreContext>
    </QueryClientProvider>
  );
}

export default MyApp;
