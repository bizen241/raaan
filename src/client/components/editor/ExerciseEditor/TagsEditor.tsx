import {
  Box,
  Button,
  Chip,
  ExpansionPanel,
  ExpansionPanelActions,
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
import { Exercise, Tag } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { useStyles } from "../../ui/styles";
import { TagEditor } from "./TagEditor";

export const TagsEditor = React.memo<{
  exerciseId: string;
  tags: Tag[];
}>(({ exerciseId, tags }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onAppendTag = useCallback(() => {
    const id = tags.reduce((maxId, tag) => Math.max(tag.id, maxId), 0);
    dispatch(
      actions.buffers.appendArrayItem<Exercise>("Exercise", exerciseId, "tags", {
        id,
        name: ""
      })
    );
  }, [tags.length]);

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
          <Box display="flex" flexWrap="wrap">
            {tags.map(tag => (
              <Box key={tag.id} pr={1} pt={1}>
                <Chip label={tag.name} />
              </Box>
            ))}
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table>
          <TableBody>
            {tags.map((tag, index) => (
              <TagEditor key={tag.id} exerciseId={exerciseId} tagIndex={index} tag={tag} />
            ))}
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button color="primary" onClick={onAppendTag}>
          <Add className={classes.leftIcon} />
          タグを追加
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
});
