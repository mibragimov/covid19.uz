import React from "react";
import {
  Table,
  Accordion,
  Button,
  Col,
  Row,
  useAccordionToggle,
  AccordionToggle,
  Container,
} from "react-bootstrap";
import DoughnutChart from "./DoughnutChart";
import { numberWithCommas } from "../utils/numberWithCommas";

export default function TableComponent({ list = [] }) {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        type="button"
        style={{ backgroundColor: "pink" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }
  return (
    <Table striped bordered hover size="sm" variant="dark" responsive="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Confirmed</th>
          <th>Deceased</th>
          <th>Critical</th>
          <th>Active</th>
          <th>Tests</th>
          <th>Recovered</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, idx) => {
          return (
            <tr key={idx}>
              <td>
                <img
                  src={`https://www.countryflags.io/${item.country_code}/flat/32.png`}
                  alt={item.country_code}
                />

                {item.state ? item.state : item.country}
              </td>
              <td>
                {numberWithCommas(item.confirmed)}{" "}
                {item.daily_confirmed && item.daily_confirmed !== -1
                  ? `+${item.daily_confirmed}`
                  : ""}
              </td>
              <td>
                {item.deaths}{" "}
                {item.daily_deaths && item.daily_deaths !== -1
                  ? `+${item.daily_deaths}`
                  : ""}
              </td>
              <td>{item.critical}</td>
              <td>
                {numberWithCommas(
                  item.confirmed - item.recovered - item.deaths
                )}
              </td>
              <td>{numberWithCommas(item.tests)}</td>
              <td>{numberWithCommas(item.recovered)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

{
  /* <Accordion defaultActiveKey={idx} key={idx} as="tr">
                  <td>
                    <AccordionToggle eventKey={idx}>info</AccordionToggle>
                  </td>
                  <td colSpan="10">
                    <Accordion.Collapse eventKey={idx}>
                     
                        <Row>
                          <Col xs="12">
                            <DoughnutChart item={item} />
                          </Col>
                          <Col xs="12">
                            <DoughnutChart item={item} />
                          </Col>
                        </Row>
                     
                    </Accordion.Collapse>
                  </td>
                </Accordion> */
}
