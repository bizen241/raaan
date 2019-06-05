import { AppBar, Box, Button, Dialog, DialogContent, IconButton, TextField, Toolbar } from "@material-ui/core";
import { Add, Close, PlayArrow } from "@material-ui/icons";
import { useCallback, useRef, useState } from "react";
import * as React from "react";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Exercise } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { QuestionEditor } from "../exercise/editors/QuestionEditor";
import { ExercisePlayer } from "../exercise/player/ExercisePlayer";

export const ExerciseEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="Exercise" rendererComponent={ExerciseEditorRenderer} />
));

const ExerciseEditorRenderer = connector(
  (_, ownProps: EntityEditorRendererProps<Exercise>) => ({
    ...ownProps
  }),
  actions => ({
    ...actions.exercise
  }),
  ({ bufferId, buffer, updateTitle, appendQuestion }) => {
    const { title, questions = [] } = buffer.edited;

    const titleInputRef = useRef<HTMLInputElement>(null);
    const appendButtonRef = useRef<HTMLButtonElement>(null);

    const [previewerState, togglePreviewer] = useState({
      isOpen: false,
      questionIndices: [0]
    });
    const onClosePreviewer = React.useCallback(
      () =>
        togglePreviewer({
          isOpen: false,
          questionIndices: []
        }),
      []
    );

    return (
      <Box display="flex" flexDirection="column" flex={1}>
        <Box display="flex" flexDirection="column" py={1}>
          <TextField
            variant="outlined"
            label="題名"
            defaultValue={title}
            inputRef={titleInputRef}
            onChange={useCallback(
              (e: React.ChangeEvent<HTMLInputElement>) => updateTitle(bufferId, e.target.value),
              []
            )}
          />
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={useCallback(
              () =>
                togglePreviewer({
                  isOpen: true,
                  questionIndices: []
                }),
              []
            )}
          >
            <PlayArrow style={{ marginRight: "0.5em" }} />
            プレビュー
          </Button>
        </Box>
        {questions.map((question, index) => (
          <Box key={question.id} display="flex" flexDirection="column" py={1}>
            <QuestionEditor bufferId={bufferId} questionIndex={index} question={question} onFocus={focus} />
          </Box>
        ))}
        <Box display="flex" flexDirection="column" py={1}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={useCallback(() => appendQuestion(bufferId), [])}
            ref={appendButtonRef}
          >
            <Add style={{ marginRight: "0.5em" }} />
            問題を追加
          </Button>
        </Box>
        <Dialog fullScreen open={previewerState.isOpen} onClose={onClosePreviewer}>
          <AppBar position="relative">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" onClick={onClosePreviewer}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <ExercisePlayer exerciseId={bufferId} isPreview onClose={onClosePreviewer} />
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
);
