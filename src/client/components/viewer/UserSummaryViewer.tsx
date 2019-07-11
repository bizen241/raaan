import { Box, Divider, Typography } from "@material-ui/core";
import * as React from "react";
import { createEntityViewer } from ".";
import { UserSummary } from "../../../shared/api/entities";

export const UserSummaryViewer = createEntityViewer<UserSummary>(
  "UserSummary",
  React.memo(({ entity: userSummary }) => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography>提出回数</Typography>
          <Typography variant="h4">{userSummary.submitCount}</Typography>
          <Divider />
        </Box>
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography>打鍵回数</Typography>
          <Typography variant="h4">{userSummary.typeCount}</Typography>
          <Divider />
        </Box>
      </Box>
    );
  })
);
