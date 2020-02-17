import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ReminderList } from "../../lists/submission-summaries/ReminderList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const ReviewPage = React.memo<PageProps>(() => {
  const { currentUserId } = useCurrentUser();

  return (
    <Page title="復習">
      <ReminderList initialParams={{ submitterId: currentUserId, searchSort: "remindAt", searchOrder: "ASC" }} />
    </Page>
  );
});
