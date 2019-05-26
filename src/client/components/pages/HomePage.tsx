import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Message } from "../project/Message";
import { Button, Column } from "../ui";
import { Page } from "./Page";

export const HomePage = connector(
  () => ({}),
  () => ({}),
  () => {
    return (
      <Page>
        <Column padding="vertical">
          <Button as={Link} to="/exercises" style={{ fontSize: "32px" }}>
            遊ぶ
          </Button>
        </Column>
        <Column padding="vertical">
          <Button as={Link} to="/exercises/edit" style={{ fontSize: "32px" }}>
            作る
          </Button>
        </Column>
        <Column padding="vertical">
          <Button as={Link} to="/config">
            <Message id="settings" />
          </Button>
        </Column>
      </Page>
    );
  }
);
