import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/nprogress.css";
import Navbar from "../components/navbar/Navbar";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { Poppins } from "@next/font/google";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, [router.events]);
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <QueryClientProvider client={queryClient}>
        <main className={poppins.className}>
          <Navbar />
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default MyApp;
