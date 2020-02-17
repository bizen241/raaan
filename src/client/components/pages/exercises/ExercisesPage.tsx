import { Edit, Person } from "@material-ui/icons";
import React from "react";
import { parseParams } from "../../../api/request/search";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const ExercisesPage = React.memo<PageProps>(props => {
  const { currentUserId } = useCurrentUser();

  const params = parseParams("ExerciseSummary", props.location.search);

  return (
    <Page title="問題集を探す">
      {params.authorId !== currentUserId && (
        <Button icon={<Person />} label="自分の問題集" to={`/users/${currentUserId}/exercises`} />
      )}
      <Button icon={<Edit />} label="問題集を作る" to="/exercises/edit" />
      <ExerciseSummaryList
        key={props.location.search}
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchSort: "createdAt",
          searchOrder: "DESC",
          ...params
        }}
      />
    </Page>
  );
});
