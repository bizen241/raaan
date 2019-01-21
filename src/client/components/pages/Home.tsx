import { AnchorButton, Classes } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Column, Row } from "../ui";

export const Home = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Column padding="small">
        <Row padding="small">
          <Row flex={1} />
          <AnchorButton text={<Trans>ログイン</Trans>} href="/auth/github" />
        </Row>
        <Column padding="small">
          <Link className={`${Classes.BUTTON}`} to="/revisions/new">
            新規作成
          </Link>
        </Column>
      </Column>
    );
  }
);
