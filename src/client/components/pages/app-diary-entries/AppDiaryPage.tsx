import * as React from "react";
import { AppDiaryGraph } from "../../graphs/AppDiaryGraph";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const AppDiaryPage = React.memo<PageProps>(() => {
  return (
    <Page title="アプリの記録">
      <AppDiaryGraph />
    </Page>
  );
});
