import { useTheme } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { Column } from "./Column";
import { IconButton } from "./IconButton";
import { Row } from "./Row";
import { Select } from "./Select";

type RowsPerPage = 10 | 25 | 50 | 100;

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
        <IconButton
          icon={theme.direction === "rtl" ? KeyboardArrowRight : KeyboardArrowLeft}
          disabled={page === 0}
          onClick={() => onChangePage(page - 1)}
        />
        <IconButton
          icon={theme.direction === "rtl" ? KeyboardArrowLeft : KeyboardArrowRight}
          disabled={page >= lastPage}
          onClick={() => onChangePage(page + 1)}
        />
      </Row>
      <Select<RowsPerPage>
        label="表示件数"
        options={{
          10: { label: "10" },
          25: { label: "25" },
          50: { label: "50" },
          100: { label: "100" },
        }}
        defaultValue={rowsPerPage as RowsPerPage}
        onChange={(value) => onChangeRowsPerPage(value)}
      />
    </Column>
  );
});
