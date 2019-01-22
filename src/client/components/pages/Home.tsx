import { AnchorButton, Card, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import { push } from "connected-react-router";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Column, Row } from "../ui";
import { createHotKeyHandler, HotKeyMap } from "../utils/hotKey";
import { Page } from "./Page";

export const Home = connector(
  state => ({
    drafts: state.buffer
  }),
  () => ({
    create: () => push("/revisions/new")
  }),
  ({ drafts, create }) => {
    const draftListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const shortcutMap: HotKeyMap = {
        n: create,
        d: () => draftListRef.current && draftListRef.current.focus()
      };

      const shortcutHandler = createHotKeyHandler(shortcutMap);
      document.addEventListener("keydown", shortcutHandler);
      return () => {
        document.removeEventListener("keydown", shortcutHandler);
      };
    }, []);

    return (
      <Page>
        <Row padding="small">
          <Row flex={1} />
          <AnchorButton text={<Trans>ログイン</Trans>} href="/auth/github" />
        </Row>
        <Column padding="small">
          <Column padding="small">編集中</Column>
          <Card>
            <Column>
              {Object.entries(drafts).map(
                ([id, data]) =>
                  data && (
                    <Column>
                      <Row center="cross">
                        <Row>{data.title}</Row>
                        <Row flex={1} />
                        <Link className={Classes.BUTTON} to={`/revisions/${id}/edit`}>
                          編集
                        </Link>
                      </Row>
                      <Divider />
                    </Column>
                  )
              )}
            </Column>
          </Card>
        </Column>
        <Column padding="small">
          <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/revisions/new">
            新規作成 (N)
          </Link>
        </Column>
      </Page>
    );
  }
);
