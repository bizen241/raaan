import { HourglassFull } from "@material-ui/icons";
import React, { useContext } from "react";
import { SubmissionSummaryList } from "../../lists/submission-summaries/SubmissionSummaryList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const SubmissionsPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="提出履歴">
      <Button color="primary" icon={<HourglassFull />} label="復習" to="/user/submissions/review" />
      <SubmissionSummaryList title="提出履歴" initialParams={{ submitterId: currentUser.id }} />
    </Page>
  );
});
