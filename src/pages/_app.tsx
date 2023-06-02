import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TOKEN_LOCALSTORAGE_KEY} from "@/utils/constants";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "@/types/util";

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page) => page);
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
        if(!token) {
            router.push('/auth/login').catch(e => console.log(e))
        }
    }, [router])
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer pauseOnHover autoClose={5000} closeOnClick />
        {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
