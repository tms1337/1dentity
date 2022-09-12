import { useEffect, useState } from "react";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// global imports
import "../styles/global.css";

// helpers
import { startLogrocketSession } from "../lib/logrocket";

// inits
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
});

// app
function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const withLogrocket = !!Component.withLogrocket;

    if (withLogrocket) {
      startLogrocketSession();
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
