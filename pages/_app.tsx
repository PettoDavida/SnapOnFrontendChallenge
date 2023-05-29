import React, {useMemo, useState} from "react";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {Context} from "@/components/context";

export default function App({Component, pageProps}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [userID, setUserID] = useState(42);
  return (
    <Context.Provider value={{userID, setUserID}}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Context.Provider>
  );
}
