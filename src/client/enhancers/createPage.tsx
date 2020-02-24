import { Avatar, Typography } from "@material-ui/core";
import { ArrowBack, Home, Mail, Person, Settings, Web } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import { TFunction } from "i18next";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { EntityId, EntityType } from "../../shared/api/entities";
import { PathParams } from "../components/project/Router";
import { Column, IconButton, Menu, MenuItem, PageContent, PageHeader, Row } from "../components/ui";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { RootState } from "../reducers";

type PageProps<T extends EntityType> = {
  entityId: EntityId<T>;
  name: string;
  secret: string;
};

export const createPage = <T extends EntityType>() => (
  TitleComponent: React.ComponentType<PageProps<T> & { t: TFunction }>,
  BodyComponent: React.ComponentType<PageProps<T> & { t: TFunction }>
) =>
  React.memo<RouteComponentProps<PathParams>>(props => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { currentUser } = useCurrentUser();

    const currentUserSummary = useSelector((state: RootState) => state.cache.get.UserSummary[currentUser.summaryId]);
    const pathname = useSelector((state: RootState) => state.router.location.pathname);

    const { id: entityId, name, secret } = props.match.params;

    return (
      <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
        <PageHeader>
          <IconButton icon={ArrowBack} onClick={useCallback(() => dispatch(goBack()), [])} />
          <Typography component="span">
            <TitleComponent entityId={entityId as EntityId<T>} name={name} secret={secret} t={t} />
          </Typography>
          <Row flex={1} />
          <Menu
            icon={
              currentUserSummary && currentUserSummary.emailHash ? (
                <Avatar src={`https://www.gravatar.com/avatar/${currentUserSummary.emailHash}?d=identicon`} />
              ) : (
                <Person />
              )
            }
          >
            <MenuItem icon={<Home />} label="ホーム" disabled={pathname === "/"} to="/" />
            <MenuItem
              icon={<Mail />}
              label="通知"
              disabled={pathname === "/user/notifications/messages"}
              to="/user/notifications/messages"
            />
            <MenuItem icon={<Web />} label="アプリ" disabled={pathname === "/app"} to="/app" />
            <MenuItem icon={<Person />} label="アカウント" disabled={pathname === "/user/account"} to="/user/account" />
            <MenuItem icon={<Settings />} label="設定" disabled={pathname === "/user/config"} to="/user/config" />
          </Menu>
        </PageHeader>
        <PageContent>
          <BodyComponent entityId={entityId as EntityId<T>} name={name} secret={secret} t={t} />
        </PageContent>
      </Column>
    );
  });
