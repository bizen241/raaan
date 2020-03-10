import { Link } from "@material-ui/core";
import { Refresh, WbIncandescent } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityId } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { Card, Menu, MenuItem, Property } from "../ui";

export const SuggestionSummaryViewer = React.memo<{
  suggestionSummaryId: EntityId<"SuggestionSummary">;
}>(({ suggestionSummaryId }) => {
  const { entity: suggestionSummary } = useEntity("SuggestionSummary", suggestionSummaryId);
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
});
