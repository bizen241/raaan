import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { deleteEntity } from "../../../api/client";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { Button, Card } from "../../ui";

export const LogoutDialog = createDialog<{}>()(
  React.memo(({ t }) => t("ログアウト")),
  React.memo(({}) => {
    const { currentUser } = useCurrentUser();

    const { entities: userSessions } = useSearch("UserSession", {
      userId: currentUser.id
    });

    const [isFailed, setStatus] = useState(false);

    const onLogout = useCallback(async () => {
      try {
        const currentSession = userSessions.find(userSession => userSession.isCurrent);
        if (currentSession === undefined) {
          return setStatus(true);
        }

        await deleteEntity("UserSession", currentSession.id);

        location.reload();
      } catch (e) {
        setStatus(true);
      }
    }, [userSessions]);

    return !isFailed ? (
      <>
        <Card>
          <Typography>すべての下書きがブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="ログアウトする" labelColor="error" onClick={onLogout} />
      </>
    ) : (
      <>
        <Card icon={<Warning />} title="ログアウトの失敗">
          <Typography>ログアウトに失敗しました。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="ログアウトする" labelColor="error" onClick={onLogout} />
      </>
    );
  })
);
