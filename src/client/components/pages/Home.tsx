import { Classes, Divider } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Home = connector(
  () => ({}),
  () => ({}),
  () => {
    return (
      <Page>
        <Header heading="ホーム" />
        <Column>
          <Column padding>
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.DISABLED}`} to="/player">
              練習する (P)
            </Link>
          </Column>
          <Column padding>
            <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/creator">
              作成する (C)
            </Link>
          </Column>
          <Divider />
          <Column padding>
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("cog")}`} to="/config">
              設定 (S)
            </Link>
          </Column>
        </Column>
      </Page>
    );
  }
);
