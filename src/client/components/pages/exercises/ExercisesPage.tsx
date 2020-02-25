import { Edit, Person } from "@material-ui/icons";
import React from "react";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useQuery } from "../../../hooks/useQuery";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { Button } from "../../ui";

export const ExercisesPage = createPage()(
  React.memo(({ t }) => t("問題集を探す")),
  React.memo(() => {
    const { currentUserId } = useCurrentUser();

    const query = useQuery<ExerciseSummary>();
    const params: Params<ExerciseSummary> = {
      tags: query.tags,
      title: query.title
    };

    return (
      <>
        {params.authorId !== currentUserId && (
          <Button icon={<Person />} label="自分の問題集" to={`/users/${currentUserId}/exercises`} />
        )}
        <Button icon={<Edit />} label="問題集を作る" to="/exercises/edit" />
        <ExerciseSummaryList
          key={location.search}
          initialParams={{
            searchLimit: 10,
            searchOffset: 0,
            searchSort: "createdAt",
            searchOrder: "DESC",
            ...params
          }}
        />
      </>
    );
  })
);
