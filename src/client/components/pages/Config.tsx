import { Button, Callout, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { buffersActions } from "../../reducers/buffers";
import { Header } from "../project/Header";
import { UserContext } from "../project/Initializer";
import { Column } from "../ui";
import { UserEditor } from "../user/UserEditor";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate,
    userBuffer: state.buffers.User[state.app.userId]
  }),
  () => ({
    addBuffer: buffersActions.add
  }),
  ({ hasUpdate, userBuffer, addBuffer }) => {
    const { currentUserId, currentUserParams } = useContext(UserContext);
    const isGuest = currentUserParams.permission === "Guest";

    useEffect(() => {
      if (userBuffer === undefined) {
        addBuffer<User>("User", currentUserId, currentUserParams);
      }
    }, []);

    if (userBuffer === undefined) {
      return <div>ロード中...</div>;
    }

    return (
      <Page>
        <Header heading="設定" />
        <Column padding>
          <Column padding>
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
          {isGuest ? (
            <Column padding>
              <Link className={`${Classes.BUTTON} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("key")}`} to="/login">
                <Trans>ログイン</Trans>
              </Link>
              <Divider />
            </Column>
          ) : null}
          <Column padding>
            <UserEditor bufferId={currentUserId} />
          </Column>
          {!isGuest ? (
            <Column padding>
              <Divider />
              <a href="/logout" className={`${Classes.BUTTON} ${Classes.iconClass("key")}`}>
                <Trans>アカウント</Trans>
              </a>
            </Column>
          ) : null}
        </Column>
      </Page>
    );
  }
);
