import { Edit, Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { createSearchPath, parseParams } from "../../../api/request/search";
import { ExerciseSummaryList } from "../../list/exercise-summaries/ExerciseSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const ExercisesPage = React.memo<PageProps>(props => {
  const currentUser = useContext(UserContext);

  const params = parseParams("ExerciseSummary", props.location.search);

  return (
    <Page title="クイズを探す">
      {params.authorId !== currentUser.id && (
        <Button
          icon={<Person />}
          label="自分のクイズ"
          to={createSearchPath("ExerciseSummary", {
            authorId: currentUser.id
          })}
        />
      )}
      <Button icon={<Edit />} label="クイズを作る" to="/exercises/edit" />
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
