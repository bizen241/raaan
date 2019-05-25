import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
import { EntityEditorProps } from ".";
import { Permission, User } from "../../../shared/api/entities";
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
  (_, ownProps: EntityEditorProps<User>) => ({
    ...ownProps
  }),
  () => ({
    ...userActions
  }),
  ({ bufferId, buffer, updateName, updatePermission }) => {
    const { name, permission } = buffer.edited;
    return (
      <Column>
        <Column padding="around">
          <label className={Classes.LABEL}>
            名前
            <Column>
              <input
                className={Classes.INPUT}
                defaultValue={name || "ゲスト"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) => updateName(bufferId, e.target.value),
                  []
                )}
              />
            </Column>
          </label>
        </Column>
        <Column padding="around">
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            権限
            <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
              <select
                defaultValue={permission || "Guest"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLSelectElement>) => updatePermission(bufferId, e.target.value as Permission),
                  []
                )}
              >
                {Object.entries(permissionNameToLabel).map(([permissionName, label]) => (
                  <option key={permissionName} value={permissionName}>
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
