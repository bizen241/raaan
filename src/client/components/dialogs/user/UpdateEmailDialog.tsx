import { Typography } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { RootState } from "../../../reducers";
import { Loading } from "../../project/Loading";
import { Button, Card } from "../../ui";

export const UpdateEmailDialog = createDialog<{}>()(
  React.memo(({ t }) => t("メールアドレスの更新")),
  React.memo(({}) => {
    const userAccountId = useSelector((state: RootState) => state.app.userAccountId);

    const { entity: userAccount, ...userAccountProps } = useEntity("UserAccount", userAccountId);
    if (userAccount === undefined) {
      return <Loading {...userAccountProps} />;
    }

    const { provider } = userAccount;

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
