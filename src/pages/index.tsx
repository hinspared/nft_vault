import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFT vault</title>
        <meta name="description" content="NFT marketplace" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dzuizm2g3/image/upload/v1685185495/nft_vault_vvqhyp.webp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
};

export default Home;
