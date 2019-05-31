import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Keyboard } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connector } from "../../reducers";
import { Column } from "../ui";
import { Page } from "./Page";

export const HomePage = connector(
  () => ({}),
  () => ({}),
  () => {
    const classes = styles();

    return (
      <Page>
        <Column padding="vertical">
          <Button className={classes.button} variant="outlined" component={RouterLink} to="/">
            <Keyboard className={classes.leftIcon} />
            遊ぶ
          </Button>
        </Column>
        <Column padding="vertical">
          <Button className={classes.button} variant="outlined" component={RouterLink} to="/exercises/edit">
            <Edit className={classes.leftIcon} />
            作る
          </Button>
        </Column>
      </Page>
    );
  }
);

const styles = makeStyles(theme => ({
  button: {
    fontSize: 32
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1em"
  }
}));
