import { HourglassFull } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { SubmissionSummaryList } from "../../list/submission-summaries/SubmissionSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserSubmissionsPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="提出履歴">
      <Button color="primary" icon={<HourglassFull />} label="復習" to="/user/submissions/review" />
      <SubmissionSummaryList title="提出履歴" initialParams={{ submitterId: currentUser.id }} />
    </Page>
  );
});
