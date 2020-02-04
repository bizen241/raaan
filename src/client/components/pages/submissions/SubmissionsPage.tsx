import { HourglassFull } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { SubmissionSummaryList } from "../../lists/submission-summaries/SubmissionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const SubmissionsPage = React.memo<PageProps>(() => {
  const currentUser = useCurrentUser();

  return (
    <Page title="提出履歴">
      <Button color="primary" icon={<HourglassFull />} label="復習" to="/user/submissions/review" />
      <SubmissionSummaryList title="提出履歴" initialParams={{ submitterId: currentUser.id }} />
    </Page>
  );
});
