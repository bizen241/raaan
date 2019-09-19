import { Box, Button, Typography } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { generateBufferId } from "../../reducers/buffers";
import { ExerciseDraftBufferList } from "../list/ExerciseDraftBufferList";
import { UserContext } from "../project/Context";
import { Page } from "../ui/Page";
import { useStyles } from "../ui/styles";

export const EditExercisesPage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);
  const dispatch = useDispatch();

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
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/users/${currentUser.id}/exercises`}
          >
            <Edit className={classes.leftIcon} />
            <Typography>下書き</Typography>
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseDraftBufferList title="編集中" />
      </Box>
    </Page>
  );
});
