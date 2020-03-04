import { Link } from "@material-ui/core";
import { Refresh, WbIncandescent } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useEntity } from "../../hooks/useEntity";
import { Card, Menu, MenuItem, Property } from "../ui";

export const SuggestionSummaryViewer = withEntity("SuggestionSummary")(
  React.memo(({ entity: suggestionSummary }) => {
    const { suggestionId, state, commentCount } = suggestionSummary;

    const { onReload } = useEntity("Suggestion", suggestionId);

    return (
      <Card
        icon={<WbIncandescent />}
        title="提案"
        action={
          <Menu>
            <MenuItem icon={<Refresh />} label="再読み込み" onClick={onReload} />
          </Menu>
        }
      >
        <Property label="状態">{state}</Property>
        <Property label="コメント">
          <Link
            underline="always"
            color="textPrimary"
            component={RouterLink}
            to={`/suggestions/${suggestionId}/comments`}
          >
            {commentCount}
          </Link>
        </Property>
      </Card>
    );
  })
);
