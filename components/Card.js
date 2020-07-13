import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { numberWithCommas } from "../utils/numberWithCommas";

export default function CardComponent({ item }) {
  return (
    <Card style={{ width: "18rem", height: "50rem" }}>
      <Card.Body>
        <Card.Title>
          Confrimed Cases: {numberWithCommas(item.confirmed)}{" "}
          {item.daily_confirmed && item.daily_confirmed !== -1
            ? `+${item.daily_confirmed}`
            : ""}
        </Card.Title>
        <Card.Text>
          Recovered: {numberWithCommas(item.recovered)}
          <br />
          Active:{" "}
          {numberWithCommas(item.confirmed - item.recovered - item.deaths)}
          <br />
          Critical: {numberWithCommas(item.critical)}
          <br />
          Death: {numberWithCommas(item.deaths)}{" "}
          {item.daily_deaths && item.daily_deaths !== -1
            ? `+${item.daily_deaths}`
            : ""}
          <br />
          Last updated: {moment(item.last_updated).fromNow()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
