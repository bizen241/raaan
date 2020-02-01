import { Comment } from "@material-ui/icons";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ObjectionCommentEditor } from "../../editors/ObjectionCommentEditor";
import { ObjectionCommentList } from "../../lists/objection-comments/ObjectionCommentList";
import { UserContext } from "../../project/Context";
import { Loading } from "../../project/Loading";
import { Button } from "../../ui";

export const ObjectionObjectionCommentsPage = createPage()(
  React.memo(({ t }) => t("抗議へのコメント")),
  React.memo(props => {
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

    const { entity: objection, ...objectionProps } = useEntity("Objection", objectionId);
    if (objection === undefined) {
      return <Loading {...objectionProps} />;
    }

    const isOwner = currentUser.permission === "Owner";
    const isOwn = objection.objectorId === currentUser.id;

    if (!isOwner && !isOwn) {
      return null;
    }

    return (
      <>
        {objectionCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {objectionCommentId !== undefined && <ObjectionCommentEditor bufferId={objectionCommentId} />}
        <ObjectionCommentList
          initialParams={{
            targetId: objectionId
          }}
        />
      </>
    );
  })
);
