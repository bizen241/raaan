import { Card, Classes, Divider } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column, Row } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  state => ({
    buffers: state.editor.buffers
  }),
  () => ({
    create: () => push("/contents/new")
  }),
  ({ buffers, create }) => {
    const draftListRef = useRef<HTMLDivElement>(null);

    useEffect(
      manageHotKey({
        n: create,
        d: () => draftListRef.current && draftListRef.current.focus()
      }),
      []
    );

    return (
      <Page>
        <Header heading="作成" />
        <Column padding="small">
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/creator/private">
              プライベート (P)
            </Link>
          </Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/creator/public">
              パブリック (C)
            </Link>
          </Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`} to="/contents/new">
              新規作成 (N)
            </Link>
          </Column>
        </Column>
        <Column padding="small">
          <Column padding="small">編集中</Column>
          <Card>
            <Column>
              {Object.entries(buffers).map(
                ([id, buffer]) =>
                  buffer && (
                    <Column key={id}>
                      <Row center="cross">
                        <Row>{buffer.editedRevision.title}</Row>
                        <Row flex={1} />
                        <Link className={Classes.BUTTON} to={`/contents/${id}/edit`}>
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
      </Page>
    );
  }
);
