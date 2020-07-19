import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  img: {
    marginRight: theme.spacing(1),
  },
}));

export default function Flag({ src, alt, m }) {
  const classes = useStyles();
  return (
    <Avatar
      src={`https://www.countryflags.io/${src}/flat/32.png`}
      alt={alt}
      variant="rounded"
      className={m ? classes.img : {}}
    />
  );
}
