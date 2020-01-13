import React, { useContext } from "react";
import { ReminderList } from "../../list/submission-summaries/ReminderList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const ReviewPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="復習">
      <ReminderList initialParams={{ submitterId: currentUser.id, searchSort: "remindAt", searchOrder: "ASC" }} />
    </Page>
  );
});
