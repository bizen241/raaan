import * as React from "react";
import { useContext } from "react";
import { SubmissionSummaryList } from "../list/search/SubmissionSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const SubmissionHistoryPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="提出履歴">
      <SubmissionSummaryList searchParams={{ userId: currentUser.id }} />
    </Page>
  );
});
