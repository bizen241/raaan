import {
  Box,
  Button,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Table,
  TableBody,
  Typography
} from "@material-ui/core";
import { Add, ExpandMore, Label } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Exercise } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { useStyles } from "../../ui/styles";
import { TagEditor } from "./TagEditor";

export const TagsEditor = React.memo<{
  exerciseId: string;
  tags: string[];
}>(({ exerciseId, tags }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onAppendTag = useCallback(
    () => dispatch(actions.buffers.appendArrayItem<Exercise>("Exercise", exerciseId, "tags", "")),
    []
  );

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" pb={2}>
            <Box pr={3}>
              <Label />
            </Box>
            <Typography>タグ</Typography>
          </Box>
          <Box display="flex">
            {tags.map(tag => (
              <Box pr={1}>
                <Chip label={tag} />
              </Box>
            ))}
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box display="flex" flexDirection="column" flex={1}>
          <Box pb={1}>
            <Table>
              <TableBody>
                {tags.map((tag, index) => (
                  <TagEditor exerciseId={exerciseId} tagIndex={index} tag={tag} />
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" flexDirection="column" flex={1} pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onAppendTag}>
              <Add className={classes.leftIcon} />
              タグを追加
            </Button>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});
