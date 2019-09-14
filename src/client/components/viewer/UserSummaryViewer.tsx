import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import * as React from "react";
import { createEntityViewer } from ".";
import { UserSummary } from "../../../shared/api/entities";
import { useStyles } from "../ui/styles";

export const UserSummaryViewer = createEntityViewer<UserSummary>(
  { entityType: "UserSummary" },
  React.memo(({ entity: userSummary }) => {
    const classes = useStyles();

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <Person />
            </Avatar>
          }
          title={<Typography>記録</Typography>}
        />
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">提出回数</Typography>
              <Typography variant="h5" component="span">
                {userSummary.submitCount}
              </Typography>
              <Divider />
            </Box>
            <Box display="flex" flexDirection="column" mb={1}>
              <Typography color="textSecondary">打鍵回数</Typography>
              <Typography variant="h5" component="span">
                {userSummary.typeCount}
              </Typography>
              <Divider />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  })
);
