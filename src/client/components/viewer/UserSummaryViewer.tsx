import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { Flag } from "@material-ui/icons";
import * as React from "react";
import { createEntityViewer } from ".";
import { UserSummary } from "../../../shared/api/entities";
import { useStyles } from "../ui/styles";

export const UserSummaryViewer = createEntityViewer<UserSummary>(
  "UserSummary",
  React.memo(({ entity: userSummary }) => {
    const classes = useStyles();

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <Flag />
            </Avatar>
          }
          title="記録"
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
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
        </CardContent>
      </Card>
    );
  })
);
