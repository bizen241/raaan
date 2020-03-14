import { HourglassFull } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { SubmissionSummaryList } from "../../lists/submission-summaries/SubmissionSummaryList";
import { Button } from "../../ui";

export const SubmissionsPage = createPage()(
  React.memo(({ t }) => t("提出履歴")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    return (
      <>
        <Button color="primary" icon={<HourglassFull />} label="復習" to="/user/submissions/review" />
        <SubmissionSummaryList initialParams={{ submitterId: currentUser.id }} />
      </>
    );
  })
);
