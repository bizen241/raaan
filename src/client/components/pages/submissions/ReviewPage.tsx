import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ReminderList } from "../../lists/submission-summaries/ReminderList";

export const ReviewPage = createPage()(
  React.memo(({ t }) => t("復習")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    return <ReminderList initialParams={{ submitterId: currentUser.id, searchSort: "remindAt", searchOrder: "ASC" }} />;
  })
);
