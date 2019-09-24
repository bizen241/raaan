import { Box, Collapse, IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Edit, Refresh, Tune } from "@material-ui/icons";
import * as React from "react";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { createEntityList } from "../../enhancers/createEntityList";
import { useToggleState } from "../../hooks/toggle";
import { UserContext } from "../project/Context";
import { Column, Row, Search, Select } from "../ui";

export const ExerciseSummaryList = createEntityList<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
              <Typography>{exerciseSummary.title || "無題"}</Typography>
            </Link>
          </Box>
        </TableCell>
        {exerciseSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton component={RouterLink} to={`/exercise-drafts/${exerciseSummary.draftId}/edit`}>
              <Edit />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );
  }),
  React.memo(({ params, onReload, onChange }) => {
    const [isSearchConditionOpen, onToggleSearchCondition] = useToggleState();
    const [searchText, setSearchText] = useState("");

    const searchTarget = getSearchTarget(params);

    return (
      <>
        <Row pb={1}>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
          <Box flex={1} />
          <IconButton onClick={onToggleSearchCondition}>
            <Tune />
          </IconButton>
        </Row>
        <Collapse in={isSearchConditionOpen} timeout="auto" unmountOnExit>
          <Column>
            <Column pb={1}>
              <Select label="並び順" defaultValue="title" onChange={e => onChange({ order: e.target.value })}>
                <option key="title" value="title">
                  更新が新しい順
                </option>
                <option key="tags" value="tags">
                  更新が古い順
                </option>
              </Select>
            </Column>
            <Column pb={1}>
              <Select
                label="検索対象"
                defaultValue={searchTarget}
                onChange={e =>
                  onChange({
                    [searchTarget]: undefined,
                    [e.target.value]: searchText
                  })
                }
              >
                <option key="title" value="title">
                  タイトル
                </option>
                <option key="tags" value="tags">
                  タグ
                </option>
              </Select>
            </Column>
          </Column>
        </Collapse>
        <Column pb={1}>
          <Search
            label="キーワード"
            defaultValue={searchText}
            onChange={e => setSearchText(e.target.value)}
            onSearch={() => onChange({ [searchTarget]: searchText })}
          />
        </Column>
      </>
    );
  })
);

type SearchTarget = "title" | "tags";

const getSearchTarget = (params: SearchParams<ExerciseSummary>): SearchTarget => (params.title ? "title" : "tags");
