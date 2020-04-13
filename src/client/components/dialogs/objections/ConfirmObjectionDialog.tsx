import { Edit, SmsFailed } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId, ObjectionTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useBuffers } from "../../../hooks/useBuffers";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button } from "../../ui";

export const ConfirmObjectionDialog = createDialog<{
  targetType: ObjectionTargetType;
  targetId: EntityId<ObjectionTargetType>;
}>()(
  React.memo(({ t }) => t("抗議する")),
  React.memo(({ targetType, targetId }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const { entities: objectionSummaries } = useSearch("ObjectionSummary", {
      objectorId: currentUser.id,
      targetId,
    });
    const objectionSummary = objectionSummaries[0];

    const { bufferIds: objectionBufferIds, bufferMap: objectionBufferMap } = useBuffers("Objection");
    const objectionBufferId = objectionBufferIds.find((bufferId) => {
      const buffer = objectionBufferMap[bufferId];

      return buffer && buffer.targetType === "Exercise" && buffer.targetId === targetId;
    });

    const objectionId = (objectionSummary && objectionSummary.parentId) || objectionBufferId;

    if (objectionId !== undefined) {
      return <Button icon={<Edit />} label="編集する" to={`/objections/${objectionId}/edit`} />;
    }

    const onCreate = () => {
      const bufferId = generateLocalEntityId();

      dispatch(
        actions.buffers.update("Objection", bufferId, {
          targetType,
          targetId,
        })
      );
      dispatch(push(`/objections/${bufferId}/edit`));
    };

    return <Button icon={<SmsFailed />} label="抗議する" onClick={onCreate} />;
  })
);
