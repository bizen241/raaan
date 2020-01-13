import { Gavel } from "@material-ui/icons";
import React, { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Property } from "../ui";
import { ObjectionSummaryViewer } from "./ObjectionSummaryViewer";

export const ObjectionViewer = withEntity("Objection")(({ entity: objection }) => {
  const { description, state } = objection;

  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";
  const isOwn = objection.objectorId === currentUser.id;

  if (!isOwner && !isOwn) {
    return null;
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
      <ObjectionSummaryViewer entityId={objection.summaryId} />
      {description && (
        <Card>
          <Property label="説明">{description}</Property>
        </Card>
      )}
    </Column>
  );
});
