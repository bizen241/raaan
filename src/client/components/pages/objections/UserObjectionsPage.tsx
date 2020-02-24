import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { ObjectionSummaryList } from "../../lists/objection-summaries/ObjectionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserObjectionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id as EntityId<"User">;

  return (
    <Page title="ユーザーの抗議一覧">
      <ObjectionSummaryList
        initialParams={{
          objectorId: userId
        }}
      />
    </Page>
  );
});
