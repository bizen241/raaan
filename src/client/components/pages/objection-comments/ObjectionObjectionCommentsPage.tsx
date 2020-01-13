import { Comment } from "@material-ui/icons";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ObjectionCommentEditor } from "../../editor/ObjectionCommentEditor";
import { ObjectionCommentList } from "../../list/objection-comments/ObjectionCommentList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const ObjectionObjectionCommentsPage = React.memo<PageProps>(props => {
  const objectionId = props.match.params.id;

  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const objectionCommentBuffers = useBuffers("ObjectionComment");
  const objectionCommentId = Object.keys(objectionCommentBuffers).find(bufferId => {
    const buffer = objectionCommentBuffers[bufferId];

    return buffer !== undefined && buffer.targetId === objectionId;
  });

  const onComment = () => {
    dispatch(
      actions.buffers.update("ObjectionComment", generateBufferId(), {
        targetId: objectionId
      })
    );
  };

  const { entity: objection } = useEntity("Objection", objectionId);
  if (objection === undefined) {
    return null;
  }

  const isOwner = currentUser.permission === "Owner";
  const isOwn = objection.objectorId === currentUser.id;

  if (!isOwner && !isOwn) {
    return null;
  }

  return (
    <Page title="抗議へのコメント">
      {objectionCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
      {objectionCommentId !== undefined && <ObjectionCommentEditor bufferId={objectionCommentId} />}
      <ObjectionCommentList
        initialParams={{
          targetId: objectionId
        }}
      />
    </Page>
  );
});
