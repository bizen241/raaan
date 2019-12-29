import * as React from "react";
import { ObjectionSummaryList } from "../../list/objection-summaries/ObjectionSummaryList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserObjectionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

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
