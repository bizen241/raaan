import { Box, Button, Dialog, IconButton, Typography } from "@material-ui/core";
import { Edit, MoreVert, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityViewer, EntityViewerContainerProps, EntityViewerRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { ExercisePlayer } from "../exercise/player/ExercisePlayer";
import { iconStyles } from "../ui/styles";

export const ExerciseViewer = React.memo<EntityViewerContainerProps>(props => {
  return <EntityViewer {...props} entityType="Exercise" renderer={ExerciseViewerRenderer} />;
});

const ExerciseViewerRenderer = React.memo<EntityViewerRendererProps<Exercise>>(
  ({ entityId: exerciseId, entity: exercise }) => {
    const [isExercisePreviewerOpen, toggleExercisePreviewer] = useState(false);
    const onToggleExercisePreviewer = useCallback(() => toggleExercisePreviewer(s => !s), []);

    const classes = iconStyles();

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Box flex={1} />
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Typography variant="h4">{exercise.title || "無題"}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Button variant="contained" size="large" color="primary" onClick={onToggleExercisePreviewer}>
            <PlayArrow className={classes.leftIcon} />
            始める
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Button variant="contained" size="large" component={RouterLink} to={`/exercises/${exerciseId}/edit`}>
            <Edit className={classes.leftIcon} />
            編集する
          </Button>
        </Box>
        <Dialog fullScreen open={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer}>
          <ExercisePlayer exerciseId={exerciseId} onClose={onToggleExercisePreviewer} />
        </Dialog>
      </Box>
    );
  }
);
