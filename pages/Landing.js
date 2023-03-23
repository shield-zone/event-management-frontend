import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Description from "../components/Description";
import DataStripe from "../components/DataStripe";

import { data, data_dataStripe } from "../assets/MOCK_DATA";

const Landing = () => {
  return (
    <div>
      <Head>
        <title>Shield Event</title>
      </Head>
      <Navbar />
      <Hero />
      <Description
        title={data.aboutUs.title}
        text={data.aboutUs.text}
        image={data.aboutUs.image}
        order={"left"}
      />
      <DataStripe data={data_dataStripe} />
      <Description
        title={data.offer.title}
        text={data.offer.text}
        image={data.offer.image}
        order={"right"}
      />
      <Description
        title={data.portfolio.title}
        text={data.portfolio.text}
        image={data.portfolio.image}
        order={"left"}
      />
    </div>
  );
};

export default Landing;
