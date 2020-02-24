import { TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { createPage } from "../../../enhancers/createPage";
import { Card, Table } from "../../ui";

interface Dependency {
  name: string;
}

export const DependenciesPage = createPage()(
  React.memo(({ t }) => t("ライセンス")),
  React.memo(() => {
    const [dependencies, setDependencies] = useState<Dependency[]>([]);

    useEffect(() => {
      fetch("/licenses.json")
        .then(value => value.json())
        .then(setDependencies);
    }, []);

    return (
      <Card padding={false}>
        <Table>
          {dependencies.map(dependency => (
            <TableRow key={dependency.name}>
              <TableCell>
                <Typography>{dependency.name}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    );
  })
);
