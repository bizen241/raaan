import { Comment, Delete, Gavel, SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { withEntity } from "../../enhancers/withEntity";
import { useBuffers } from "../../hooks/useBuffers";
import { useToggleState } from "../../hooks/useToggleState";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { DeleteObjectionDialog } from "../dialogs/objections/DeleteObjectionDialog";
import { ObjectionCommentEditor } from "../editor/ObjectionCommentEditor";
import { ObjectionCommentList } from "../list/objection-comments/ObjectionCommentList";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Menu, MenuItem, Property } from "../ui";

export const ObjectionViewer = withEntity("Objection")(({ entity: objection }) => {
  const { description, state } = objection;

  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const objectionCommentBuffers = useBuffers("ObjectionComment");
  const objectionCommentId = Object.keys(objectionCommentBuffers).find(bufferId => {
    const buffer = objectionCommentBuffers[bufferId];

    return buffer !== undefined && buffer.targetId === objection.id;
  });

  const onComment = () => {
    dispatch(
      actions.buffers.update("ObjectionComment", generateBufferId(), {
        targetId: objection.id
      })
    );
  };

  const isOwner = currentUser.permission === "Owner";
  const isOwn = objection.objectorId === currentUser.id;

  return (
    <Column>
      {isOwner && (
        <Button
          color="primary"
          icon={<Gavel />}
          label={state === "pending" ? "対応する" : "編集する"}
          to={`/objections/${objection.id}/edit`}
        />
      )}
      <Card
        icon={<SmsFailed />}
        title="抗議"
        action={
          isOwn && (
            <Menu>
              <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
            </Menu>
          )
        }
      >
        {description && <Property label="説明">{description}</Property>}
        <Property label="状態">{state}</Property>
      </Card>
      {isOwn && (
        <DeleteObjectionDialog objectionId={objection.id} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      )}
      <ObjectionCommentList
        initialParams={{
          targetId: objection.id
        }}
      />
      {isOwn && objectionCommentId === undefined && (
        <Button icon={<Comment />} label="コメントする" onClick={onComment} />
      )}
      {isOwn && objectionCommentId !== undefined && <ObjectionCommentEditor bufferId={objectionCommentId} />}
    </Column>
  );
});
