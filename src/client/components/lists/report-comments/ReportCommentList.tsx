import { Typography } from "@material-ui/core";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const ReportCommentList = createEntityList("ReportComment")(
  React.memo(({ entity: reportComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", reportComment.authorId);

    return (
      <TableRow>
        <Link label={authorSummary.name} to={`/users/${reportComment.authorId}`} />
        <Typography>{reportComment.body}</Typography>
      </TableRow>
    );
  })
);
