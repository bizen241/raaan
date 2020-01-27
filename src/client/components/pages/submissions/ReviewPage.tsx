import React, { useContext } from "react";
import { ReminderList } from "../../lists/submission-summaries/ReminderList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const ReviewPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="復習">
      <ReminderList initialParams={{ submitterId: currentUser.id, searchSort: "remindAt", searchOrder: "ASC" }} />
    </Page>
  );
});
