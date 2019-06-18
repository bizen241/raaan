import { Box, Button } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { createExercise } from "../../domain/exercise/create";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { ExerciseBufferList } from "../list/buffers/ExerciseBufferList";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const EditExercisesPage = React.memo(() => {
  const dispatch = useDispatch();

  const onCreate = useCallback(() => {
    const bufferId = generateBufferId();

    dispatch(actions.buffers.add("Exercise", bufferId, createExercise()));
    dispatch(push(`/exercises/${bufferId}/edit`));
  }, []);

  const currentUser = useContext(UserContext);
  const classes = useStyles();

  return (
    <Page title="作る">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" color="primary" onClick={onCreate}>
          <Add className={classes.leftIcon} />
          新規作成
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          component={RouterLink}
          to={`/users/${currentUser.id}/exercises`}
        >
          <Edit className={classes.leftIcon} />
          自分の問題集
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseBufferList />
      </Box>
    </Page>
  );
});
