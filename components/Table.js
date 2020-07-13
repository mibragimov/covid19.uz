import React from "react";
import { Table, Accordion, Button, Card } from "react-bootstrap";
import DoughnutChart from "./DoughnutChart";
import { numberWithCommas } from "../utils/numberWithCommas";

export default function TableComponent({ list = [] }) {
  return (
    <Table striped bordered hover size="sm" variant="dark" responsive>
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
            <Accordion defaultActiveKey={idx} key={idx} as="tr">
              <td>
                <img
                  src={`https://www.countryflags.io/${item.country_code}/flat/32.png`}
                  alt={item.country_code}
                />
                <Accordion.Toggle as={Button} eventKey={idx}>
                  {item.state ? item.state : item.country}
                </Accordion.Toggle>
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

              <td>
                <Accordion.Collapse eventKey={idx}>
                  <>
                    <DoughnutChart item={item} />
                    <DoughnutChart item={item} />
                  </>
                </Accordion.Collapse>
              </td>
            </Accordion>
          );
        })}
      </tbody>
    </Table>
  );
}
