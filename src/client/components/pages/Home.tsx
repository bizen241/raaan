import { Trans } from "@lingui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Button, Column, Row } from "../ui";

export const Home = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Column padding="small">
        <Row padding="small">
          <Row flex={1} />
          <Button size="small" as="a" href="/auth/github">
            <Trans>ログイン</Trans>
          </Button>
        </Row>
        <Column padding="small">
          <Button as={Link} to="/revisions/new">
            新規作成
          </Button>
        </Column>
      </Column>
    );
  }
);
