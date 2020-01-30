import { Typography } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { RootState } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UpdateEmailDialog = createDialog<{}>()(
  React.memo(({ t }) => t("メールアドレスの更新")),
  React.memo(({}) => {
    const currentUserAccountId = useSelector((state: RootState) => state.app.userAccountId);
    const { entity: currentUserAccount } = useEntity("UserAccount", currentUserAccountId);
    if (currentUserAccount === undefined) {
      return null;
    }

    const { provider } = currentUserAccount;

    return (
      <>
        <Card>
          <Typography>メールアドレスを更新します。</Typography>
        </Card>
        <Button icon={<Email />} label="メールアドレスを更新" href={`/auth/${provider}`} />
      </>
    );
  })
);
