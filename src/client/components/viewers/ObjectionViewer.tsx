import { Gavel } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { hasPermission } from "../../../shared/api/security";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { PermissionDenied } from "../project/PermissionDenied";
import { Button, Card, Column, Property } from "../ui";
import { ObjectionSummaryViewer } from "./ObjectionSummaryViewer";

export const ObjectionViewer = React.memo<{
  objectionId: EntityId<"Objection">;
}>(({ objectionId }) => {
  const { entity: objection } = useEntity("Objection", objectionId);
  const { description, state } = objection;

  const { currentUser } = useCurrentUser();

  const isOwner = currentUser.permission === "Owner";
  const isOwn = objection.objectorId === currentUser.id;

  if (!isOwn && hasPermission(currentUser, "Admin")) {
    return <PermissionDenied />;
  }

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
      <ObjectionSummaryViewer objectionSummaryId={objection.summaryId} />
      {description && (
        <Card>
          <Property label="説明">{description}</Property>
        </Card>
      )}
    </Column>
  );
});
