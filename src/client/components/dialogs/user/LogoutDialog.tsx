import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { UserSession } from "../../../../shared/api/entities";
import { deleteEntity } from "../../../api/client";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { UserContext } from "../../project/Context";
import { Message } from "../../project/Message";
import { Button, Card, DialogContent } from "../../ui";

export const LogoutDialog = createDialog(
  React.memo(({ onClose }) => {
    const currentUser = useContext(UserContext);

    const { entities: userSessions } = useSearch<UserSession>("UserSession", {
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

    return (
      <DialogContent title={<Message id="logout" />} onClose={onClose}>
        {!isFailed ? (
          <>
            <Card icon={<Warning />} title={<Message id="logout" />}>
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
        )}
      </DialogContent>
    );
  })
);
