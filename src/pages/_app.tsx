import { type AppType } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mumbai}
      chainRpc={{
        [ChainId.Mumbai]:
          "https://polygon-mumbai.infura.io/v3/0ad3782ffb8941088b9c333d8a158133",
      }}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
