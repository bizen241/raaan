import { Box, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { EntityViewer, EntityViewerContainerProps, EntityViewerRendererProps } from ".";
import { UserAccount } from "../../../shared/api/entities";

export const UserAccountViewer = React.memo<EntityViewerContainerProps>(props => {
  return <EntityViewer {...props} entityType="UserAccount" renderer={UserAccountViewerRenderer} />;
});

const UserAccountViewerRenderer = React.memo<EntityViewerRendererProps<UserAccount>>(({ entity: userAccount }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography gutterBottom>プロバイダ</Typography>
        <Typography variant="h5">{userAccount.provider}</Typography>
        <Divider />
      </Box>
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography gutterBottom>ID</Typography>
        <Typography variant="h5">{userAccount.accountId}</Typography>
        <Divider />
      </Box>
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography gutterBottom>メールアドレス</Typography>
        <Typography variant="h5">{userAccount.email}</Typography>
        <Divider />
      </Box>
    </Box>
  );
});
