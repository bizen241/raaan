import { Box, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { createEntityViewer } from ".";
import { UserAccount } from "../../../shared/api/entities";

export const UserAccountViewer = createEntityViewer<UserAccount>(
  { entityType: "UserAccount" },
  React.memo(({ entity: userAccount }) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography color="textSecondary">プロバイダ</Typography>
          <Typography>{userAccount.provider}</Typography>
          <Divider />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography color="textSecondary">ID</Typography>
          <Typography>{userAccount.accountId}</Typography>
          <Divider />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography color="textSecondary">メールアドレス</Typography>
          <Typography>{userAccount.email}</Typography>
          <Divider />
        </Box>
      </Box>
    );
  })
);
