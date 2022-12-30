import { type NextPage } from "next";
import Head from "next/head";
import MainPageComponent from "../components/MainPageComponent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT marketplace</title>
        <meta name="description" content="marketplace for NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPageComponent />
    </>
  );
};

export default Home;
