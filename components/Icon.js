import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tooltip, Typography } from "@material-ui/core";
import Snackbar from "./Snackbar";
import Slide from "@material-ui/core/Slide";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const useIconStyles = makeStyles((theme) => ({
  box: (props) => ({
    backgroundColor: theme.palette.primary.A700,
    display: "inline-block",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "5px",
    width: "42px",
    height: "42px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: props.backgroundColor,
    },
  }),
  popper: {
    backgroundColor: theme.palette.primary.A700,
  },
  btn: {
    "&:focus": {
      outline: "none",
    },
  },
}));

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Icon({ children, title, icon }) {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const linkString = "https://cov19.uz";

  const props = {
    backgroundColor:
      icon === "facebook"
        ? "#3b5998"
        : icon === "twitter"
        ? "#1da1f2"
        : "#ff3860",
  };
  const classes = useIconStyles(props);

  const handleClick = () => {
    navigator.clipboard.writeText(linkString);
    setTransition(() => TransitionUp);
    setOpen(true);
  };

  let button = (
    <>
      <Tooltip
        title={title}
        arrow
        className={classes.popper}
        placement="bottom-start"
      >
        <Box className={classes.box} component="span" onClick={handleClick}>
          <Typography variant="h6">{children}</Typography>
        </Box>
      </Tooltip>
      <Snackbar open={open} setOpen={setOpen} transition={transition} />
    </>
  );

  if (icon === "facebook") {
    button = (
      <Tooltip
        title={title}
        arrow
        className={classes.popper}
        placement="bottom-start"
      >
        <Box className={classes.box} component="span" onClick={handleClick}>
          <Typography variant="h6">
            <FacebookShareButton url={linkString} className={classes.btn}>
              {children}
            </FacebookShareButton>
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  if (icon === "twitter") {
    button = (
      <Tooltip
        title={title}
        arrow
        className={classes.popper}
        placement="bottom-start"
      >
        <Box className={classes.box} component="span" onClick={handleClick}>
          <Typography variant="h6">
            <TwitterShareButton url={linkString} className={classes.btn}>
              {children}
            </TwitterShareButton>
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  return button;
}
