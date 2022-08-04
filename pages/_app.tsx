import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
