import Head from "next/head";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Navigation from "../components/Navbar";
import TableComponent from "../components/Table";
import CardComponent from "../components/Card";

export default function Home({ totals, regions }) {
  const [arr, setArr] = useState(regions.world.list);

  const asia = mergeLists(regions.asia.list, regions.world.list);
  const europe = mergeLists(regions.europe.list, regions.world.list);
  const africa = mergeLists(regions.africa.list, regions.world.list);
  const southamerica = mergeLists(
    regions.southamerica.list,
    regions.world.list
  );
  const oceania = mergeLists(regions.oceania.list, regions.world.list);
  const uzbekistan = regions.world.list.find(
    (ctry) => ctry.country_code === "uz"
  );

  function mergeLists(listA, listB) {
    let arr = [];
    for (let code of listA) {
      for (let country of listB) {
        if (country.country_code === code) {
          arr.push(country);
        }
      }
    }
    return arr;
  }
  console.log(regions);
  return (
    <Container fluid>
      <Head>
        <title>Covid19 tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Container fluid>
        <Row>
          <Col lg="3">
            <CardComponent item={uzbekistan} />
            <CardComponent item={totals} />
          </Col>
          <Col>
            <div>
              <button onClick={() => setArr(europe)}>Europe</button>
              <button onClick={() => setArr(africa)}>Africa</button>
              <button onClick={() => setArr(asia)}>Asia</button>
              <button onClick={() => setArr(southamerica)}>
                South America
              </button>
              <button onClick={() => setArr(oceania)}>Oceania</button>
              <button onClick={() => setArr(regions.china.list)}>China</button>
              <button onClick={() => setArr(regions.russia.list)}>
                Russia
              </button>
              <button onClick={() => setArr(regions.canada.list)}>
                Canada
              </button>
              <button onClick={() => setArr(regions.unitedstates.list)}>
                USA
              </button>
              <button onClick={() => setArr(regions.italy.list)}>Italy</button>
              <button onClick={() => setArr(regions.australia.list)}>
                Australia
              </button>
            </div>
            <TableComponent list={arr} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  // const res = await Axios.get("https://cov19.cc/report.json");

  const [res1] = await Promise.all([Axios.get("https://cov19.cc/report.json")]);

  return {
    props: {
      totals: res1.data.regions.world.totals,
      regions: res1.data.regions,
      updated: res1.data.last_updated,
    },
  };
}
