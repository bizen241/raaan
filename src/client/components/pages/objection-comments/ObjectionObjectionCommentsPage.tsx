import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { ObjectionCommentEditor } from "../../editors/ObjectionCommentEditor";
import { ObjectionCommentList } from "../../lists/objection-comments/ObjectionCommentList";
import { Button } from "../../ui";

export const ObjectionObjectionCommentsPage = createPage<"Objection">()(
  React.memo(({ t }) => t("抗議へのコメント")),
  React.memo(({ entityId: objectionId }) => {
    const dispatch = useDispatch();

    const { bufferIds: objectionCommentBufferIds, bufferMap: objectionCommentBufferMap } = useBuffers(
      "ObjectionComment"
    );
    const objectionCommentId = objectionCommentBufferIds.find(bufferId => {
      const buffer = objectionCommentBufferMap[bufferId];

      return buffer !== undefined && buffer.targetId === objectionId;
    });

    const onComment = () => {
      dispatch(
        actions.buffers.update("ObjectionComment", generateLocalEntityId(), {
          targetId: objectionId
        })
      );
    };

    return (
      <>
        {!objectionCommentId && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {objectionCommentId && <ObjectionCommentEditor bufferId={objectionCommentId} />}
        <ObjectionCommentList
          initialParams={{
            targetId: objectionId
          }}
        />
      </>
    );
  })
);
