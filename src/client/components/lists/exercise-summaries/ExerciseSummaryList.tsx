import { Box, Collapse, Link, Typography } from "@material-ui/core";
import { Edit, Refresh, Tune } from "@material-ui/icons";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useToggleState } from "../../../hooks/useToggleState";
import { Column, IconButton, Row, Search, Select, TableRow } from "../../ui";

export const ExerciseSummaryList = createEntityList("ExerciseSummary")(
  React.memo(({ entity: exerciseSummary }) => {
    const { currentUserId } = useCurrentUser();

    const isAuthor = exerciseSummary.authorId === currentUserId;

    return (
      <TableRow action={isAuthor && <IconButton icon={Edit} to={`/exercises/${exerciseSummary.exerciseId}/edit`} />}>
        <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
          <Typography>{exerciseSummary.title || "無題"}</Typography>
        </Link>
      </TableRow>
    );
  }),
  React.memo(({ params, onReload, onChange }) => {
    const [isSearchConditionOpen, onToggleSearchCondition] = useToggleState();
    const [searchText, setSearchText] = useState(params.tags || params.title || "");

    const searchTarget = getSearchTarget(params);

    return (
      <>
        <Row pb={1}>
          <IconButton icon={Refresh} onClick={onReload} />
          <Box flex={1} />
          <IconButton icon={Tune} onClick={onToggleSearchCondition} />
        </Row>
        <Collapse in={isSearchConditionOpen} timeout="auto" unmountOnExit>
          <Column>
            <Select<Required<ExerciseSummary>["searchSort"]>
              label="並び順"
              options={{
                createdAt: {
                  label: "作成日時"
                }
              }}
              defaultValue="createdAt"
              onChange={value => onChange({ searchSort: value })}
            />
            <Select<SearchTarget>
              label="検索対象"
              options={{
                title: {
                  label: "タイトル"
                },
                tags: {
                  label: "タグ"
                }
              }}
              defaultValue={searchTarget}
              onChange={value =>
                onChange({
                  [searchTarget]: undefined,
                  [value]: searchText
                })
              }
            />
          </Column>
        </Collapse>
        <Column pb={1}>
          <Search
            label="キーワード"
            defaultValue={searchText}
            onChange={setSearchText}
            onSearch={() => onChange({ [searchTarget]: searchText })}
          />
        </Column>
      </>
    );
  })
);

type SearchTarget = "title" | "tags";

const getSearchTarget = (params: Params<ExerciseSummary>): SearchTarget =>
  params.title !== undefined ? "title" : "tags";
