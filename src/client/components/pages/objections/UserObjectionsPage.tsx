import * as React from "react";
import { ObjectionList } from "../../list/objections/ObjectionList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const UserObjectionsPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="ユーザーの抗議一覧">
      <ObjectionList
        initialParams={{
          objectorId: userId
        }}
      />
    </Page>
  );
});
