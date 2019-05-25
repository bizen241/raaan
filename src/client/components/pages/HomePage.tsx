import { Classes, Divider } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Message } from "../project/Message";
import { Column } from "../ui";
import { Page } from "./Page";

export const HomePage = connector(
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
                to="/exercises"
              >
                みんなの問題集
              </Link>
            </Column>
            <Column padding="vertical">
              <Link
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("lock")} ${Classes.DISABLED}`}
                to="/exercises/private"
              >
                自分の問題集
              </Link>
            </Column>
          </Column>
          <Divider />
          <Column padding="vertical">
            <h2 className={Classes.HEADING}>作成する</h2>
            <Column padding="vertical">
              <Link
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("folder-new")}`}
                to="/exercises/edit"
              >
                問題集を作る
              </Link>
            </Column>
          </Column>
          <Divider />
          <Column padding="vertical">
            <h2 className={Classes.HEADING}>その他</h2>
            <Column padding="vertical">
              <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.iconClass("cog")}`} to="/config">
                <Message id="settings" />
              </Link>
            </Column>
          </Column>
        </Column>
      </Page>
    );
  }
);
