import { Link } from "@material-ui/core";
import { Delete, Dns } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Synonym } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Card, Column, Menu, MenuItem, Property } from "../ui";

export const SynonymViewer = withEntity<Synonym>({ entityType: "Synonym" })(
  React.memo(({ entity: synonym }) => {
    const currentUser = useContext(UserContext);

    const isOwner = currentUser.permission === "Owner";
    return (
      <Column>
        <Card
          icon={<Dns />}
          title={synonym.name}
          action={<Menu>{isOwner && <MenuItem icon={<Delete />} label="削除する" />}</Menu>}
        >
          <Property label="変換先">
            <Link underline="always" color="textPrimary" component={RouterLink} to={`/tags/${synonym.target}`}>
              {synonym.target}
            </Link>
          </Property>
        </Card>
      </Column>
    );
  })
);
