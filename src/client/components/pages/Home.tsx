import { Classes, Divider } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Column } from "../ui";
import { Page } from "./Page";

export const Home = connector(
  () => ({}),
  () => ({}),
  () => {
    return (
      <Page>
        <Column>
          <Column padding="vertical">
            <h2 className={Classes.HEADING}>練習する</h2>
            <Column padding="vertical">
              <Link
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("globe")} ${Classes.DISABLED}`}
                to="/player"
              >
                みんなの問題集
              </Link>
            </Column>
            <Column padding="vertical">
              <Link
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("lock")} ${Classes.DISABLED}`}
                to="/player"
              >
                自分の問題集
              </Link>
            </Column>
          </Column>
          <Divider />
          <Column padding="vertical">
            <h2 className={Classes.HEADING}>作成する</h2>
            <Column padding="vertical">
              <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("folder-new")}`} to="/creator">
                問題集を作る
              </Link>
            </Column>
          </Column>
          <Divider />
          <Column padding="vertical">
            <h2 className={Classes.HEADING}>その他</h2>
            <Column padding="vertical">
              <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("cog")}`} to="/config">
                設定
              </Link>
            </Column>
          </Column>
        </Column>
      </Page>
    );
  }
);
