import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const useCustomIconButtonStyles = makeStyles((theme) => ({
  color: {
    color: theme.palette.warning.light,
  },
}));
export default function CustomIconButton({
  onRemoveItem,
  onAddItem,
  country,
  watchlist = [],
}) {
  const [outline, setOutline] = React.useState(true);
  const classes = useCustomIconButtonStyles();

  function check() {
    return watchlist.find((item) => item.country === country);
  }

  const add = () => {
    onAddItem();
  };

  const remove = () => {
    onRemoveItem();
  };

  let button = (
    <IconButton
      aria-label="expand row"
      size="medium"
      className={classes.color}
      onClick={add}
    >
      <AiOutlineStar />
    </IconButton>
  );

  if (check()) {
    button = (
      <IconButton
        aria-label="expand row"
        size="medium"
        className={classes.color}
        onClick={remove}
      >
        <AiFillStar />
      </IconButton>
    );
  }

  return button;
}
