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
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Exercise, Tag } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { useStyles } from "../../ui/styles";
import { TagEditor } from "./TagEditor";

export const TagsEditor = React.memo<{
  exerciseId: string;
  tags: Tag[];
}>(({ exerciseId, tags: initialTags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tags, setTags] = useState(initialTags);

  const onAppendTag = useCallback(() => {
    const id = tags.reduce((maxId, tag) => Math.max(tag.id, maxId), 0);

    setTags(prevTags => {
      const nextTags = [...prevTags, { id, name: "" }];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { tags: nextTags }));
      return nextTags;
    });
  }, []);
  const onUpdateTag = useCallback((index: number, value: string) => {
    setTags(prevTags => {
      const nextTags = [...prevTags.slice(0, index), { ...prevTags[index], name: value }, ...prevTags.slice(index + 1)];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { tags: nextTags }));
      return nextTags;
    });
  }, []);
  const onDeleteTag = useCallback((index: number) => {
    setTags(prevTags => {
      const nextTags = [...prevTags.slice(0, index), ...prevTags.slice(index + 1)];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { tags: nextTags }));
      return nextTags;
    });
  }, []);

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
              <TagEditor key={tag.id} tagIndex={index} tag={tag} onUpdate={onUpdateTag} onDelete={onDeleteTag} />
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
