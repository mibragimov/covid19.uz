import React from "react";
import { ButtonGroup, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useButtonGroupStyles = makeStyles((theme) => ({
  root: {
    display: "block",
  },
  text: {
    fontWeight: 500,
  },
  btn: {
    color: theme.palette.error.main,
  },
}));

export default function CustomButtonGroup({ setRows, list, setPage }) {
  const [active, setActive] = React.useState(0);
  const classes = useButtonGroupStyles();

  const handleClick = (item, id) => {
    setRows(item);
    setActive(id);
    setPage(0);
  };
  return (
    <ButtonGroup
      variant="text"
      aria-label="text primary button group"
      className={classes.root}
    >
      {list.map((item, idx) => {
        return (
          <Button
            onClick={() => handleClick(item.country, idx)}
            key={item.name}
            className={active === idx ? classes.btn : {}}
          >
            <Typography variant="subtitle1" className={classes.text}>
              {item.name}
            </Typography>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
