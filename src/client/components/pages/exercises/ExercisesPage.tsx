import { Edit, Person } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { ExerciseSummaryList } from "../../list/ExerciseSummaryList";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const ExercisesPage = React.memo(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="クイズを探す">
      <Button icon={<Person />} label="自分のクイズ" to={`/users/${currentUser.id}/exercises`} />
      <Button icon={<Edit />} label="クイズを作る" to="/exercises/edit" />
      <ExerciseSummaryList
        initialParams={{
          searchLimit: 10,
          searchOffset: 0,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
