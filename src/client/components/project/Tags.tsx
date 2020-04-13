import { Typography } from "@material-ui/core";
import React from "react";
import { Link, Row } from "../ui";

export const Tags = React.memo<{
  value: string | undefined;
}>(({ value }) => {
  if (value === undefined) {
    return <Typography>タグがありません</Typography>;
  }

  return (
    <Row>
      {value.split(/\s/).map(
        (tag) =>
          tag && (
            <Row key={tag} pr={1}>
              <Link to={`/tags/${tag}`} label={tag} />
            </Row>
          )
      )}
    </Row>
  );
});
