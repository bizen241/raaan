import { IconButton, useTheme } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import * as React from "react";
import { Column } from "./Column";
import { Row } from "./Row";
import { Select } from "./Select";

export const TablePagination = React.memo<{
  page: number;
  count: number;
  rowsPerPage: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
}>(({ page, count, rowsPerPage, onChangePage, onChangeRowsPerPage }) => {
  const theme = useTheme();

  const lastPage = Math.ceil(count / rowsPerPage) - 1;

  return (
    <Column>
      <Row pb={1} alignItems="center">
        <Row flex={1} />
        <IconButton disabled={page === 0} onClick={() => onChangePage(page - 1)}>
          {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton disabled={page >= lastPage} onClick={() => onChangePage(page + 1)}>
          {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Row>
      <Select
        label="表示件数"
        defaultValue={rowsPerPage.toString()}
        onChange={e => onChangeRowsPerPage(parseInt(e.target.value, 10))}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
    </Column>
  );
});
