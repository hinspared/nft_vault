import { type AppType } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <main className={poppins.className}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </ThirdwebProvider>
  );
};

export default MyApp;
