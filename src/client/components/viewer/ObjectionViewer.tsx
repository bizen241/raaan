import { Gavel, SmsFailed } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Property } from "../ui";

export const ObjectionViewer = withEntity("Objection")(({ entity: objection }) => {
  const { description, state, comment } = objection;

  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";

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
      <Card icon={<SmsFailed />} title="抗議">
        {description && <Property label="説明">{description}</Property>}
        <Property label="状態">{state}</Property>
        {comment && <Property label="コメント">{comment}</Property>}
      </Card>
    </Column>
  );
});
