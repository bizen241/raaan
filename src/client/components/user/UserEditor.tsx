import { Classes } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useCallback } from "react";
import { Permission } from "../../../shared/api/entities";
import { userActions } from "../../actions/user";
import { connector } from "../../reducers";
import { Column } from "../ui";

const permissionNameToLabel: { [T in Permission]: string } = {
  Owner: "オーナー",
  Admin: "管理者",
  Write: "書き込み",
  Guest: "ゲスト"
};

export const UserEditor = connector(
  (_, { bufferId }: { bufferId: string }) => ({
    bufferId
  }),
  () => ({
    ...userActions
  }),
  ({ bufferId, updateName, updatePermission }) => {
    return (
      <Column>
        <Column padding>
          <label className={Classes.LABEL}>
            <Trans>名前</Trans>
            <Column>
              <input
                className={Classes.INPUT}
                defaultValue={"ゲスト"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) => updateName(bufferId, e.target.value),
                  []
                )}
              />
            </Column>
          </label>
        </Column>
        <Column padding>
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            <Trans>権限</Trans>
            <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
              <select
                defaultValue={"Guest"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLSelectElement>) => updatePermission(bufferId, e.target.value as Permission),
                  []
                )}
              >
                {Object.entries(permissionNameToLabel).map(([name, label]) => (
                  <option key={name} value={name}>
                    {label}
                  </option>
                ))}
              </select>
            </Column>
          </label>
        </Column>
      </Column>
    );
  }
);
