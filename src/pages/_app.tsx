import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {NextPageWithLayout} from "@/types/util";

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer hideProgressBar pauseOnHover autoClose={2000} theme={'colored'} closeOnClick />
        {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
