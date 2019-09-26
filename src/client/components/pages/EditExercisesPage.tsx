import { Box, Button, Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { generateBufferId } from "../../reducers/buffers";
import { ExerciseDraftBufferList } from "../list/ExerciseDraftBufferList";
import { ExerciseSummaryList } from "../list/ExerciseSummaryList";
import { UserContext } from "../project/Context";
import { Column, Page } from "../ui";
import { useStyles } from "../ui/styles";

export const EditExercisesPage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();

  const [tab, setTab] = useState<"buffers" | "drafts">("buffers");

  const onCreate = useCallback(() => {
    const bufferId = generateBufferId();

    dispatch(push(`/exercise-drafts/${bufferId}/edit`));
  }, []);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="クイズを作る">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" color="primary" onClick={onCreate}>
          <Add className={classes.leftIcon} />
          <Typography>新しいクイズ</Typography>
        </Button>
      </Box>
      <Column pb={1}>
        <Paper>
          <Tabs value={tab} variant="fullWidth" indicatorColor="primary" onChange={(_, value) => setTab(value)}>
            <Tab value="buffers" label={<Typography>未保存</Typography>} />
            {!isGuest && <Tab value="drafts" label={<Typography>下書き</Typography>} />}
          </Tabs>
          <Divider />
          {tab === "buffers" ? (
            <ExerciseDraftBufferList elevation={0} />
          ) : (
            <ExerciseSummaryList
              elevation={0}
              initialParams={{
                authorId: currentUser.id,
                isEditing: true
              }}
            />
          )}
        </Paper>
      </Column>
    </Page>
  );
});
