import { Group as GroupIcon, Send } from "@material-ui/icons";
import * as React from "react";
import { Contest } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const ContestViewer = withEntity<Contest>({ entityType: "Contest" })(({ entity: contest }) => {
  return (
    <Column>
      <Button icon={<Send />} label="提出する" />
      <Card icon={<GroupIcon />} title={contest.title || "無題"}>
        <Property label="開始日時">{new Date(contest.startAt).toLocaleString()}</Property>
        <Property label="終了日時">{new Date(contest.finishAt).toLocaleString()}</Property>
      </Card>
    </Column>
  );
});
