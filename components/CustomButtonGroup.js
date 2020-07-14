import React from "react";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useButtonGroupStyles = makeStyles((theme) => ({
  text: {
    fontWeight: 500,
  },
}));

export default function CustomButtonGroup({ handleClick, list }) {
  const classes = useButtonGroupStyles();
  return (
    <ButtonGroup
      variant="text"
      color="warning"
      aria-label="text secondary button group"
    >
      {list.map((item) => {
        return (
          <Button onClick={() => handleClick(item.country)} key={item.name}>
            <Typography variant="subtitle1" className={classes.text}>
              {item.name}
            </Typography>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
