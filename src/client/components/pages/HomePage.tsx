import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Keyboard } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "./Page";

export const HomePage = React.memo(() => {
  const classes = useStyles();

  return (
    <Page title="ホーム">
      <Box display="flex" flexDirection="column" py={1}>
        <Button className={classes.button} variant="outlined" component={RouterLink} to="/exercises">
          <Keyboard className={classes.leftIcon} />
          遊ぶ
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" py={1}>
        <Button className={classes.button} variant="outlined" component={RouterLink} to="/exercises/edit">
          <Edit className={classes.leftIcon} />
          作る
        </Button>
      </Box>
    </Page>
  );
});

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: 32
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1em"
  }
}));
