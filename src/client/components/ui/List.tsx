import { ButtonGroup, Classes, Collapse } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Details } from "./Details";
import { Column } from "./Flex";
import { Summary } from "./Summary";

export const List: React.FunctionComponent<{
  title: string;
  limit: number;
  offset: number;
  onChangeLimit: (limit: number) => void;
  onChangeOffset: (offset: number) => void;
  hasNextPage: boolean;
  focusKey: string;
}> = ({ title, limit, offset, onChangeOffset, hasNextPage, focusKey, children }) => {
  const [isOpen, toggleList] = useState(true);

  const goPreviousPage = useCallback(() => onChangeOffset(offset - limit), [limit, offset]);
  const goNextPage = useCallback(() => onChangeOffset(offset + limit), [limit, offset]);

  const hasPreviousPage = offset !== 0;

  return (
    <Details>
      <Summary title={title} focusKey={focusKey} isOpen={isOpen} onClick={useCallback(() => toggleList(s => !s), [])} />
      <Collapse isOpen={isOpen}>
        {Array.isArray(children) && children.length > 0 ? (
          <Column padding="small">{children}</Column>
        ) : (
          <Column center="both" padding="large">
            アイテムがありません
          </Column>
        )}
        <Column padding="small">
          <ButtonGroup fill>
            <button
              onClick={hasPreviousPage ? goPreviousPage : undefined}
              className={`${Classes.BUTTON} ${hasPreviousPage ? "" : Classes.DISABLED} ${Classes.iconClass(
                "chevron-left"
              )}`}
            />
            <span className={`${Classes.BUTTON} ${Classes.FOCUS_DISABLED}`}>{(offset + limit) / limit}</span>
            <button
              onClick={hasNextPage ? goNextPage : undefined}
              className={`${Classes.BUTTON} ${hasNextPage ? "" : Classes.DISABLED} ${Classes.iconClass(
                "chevron-right"
              )}`}
            />
          </ButtonGroup>
        </Column>
      </Collapse>
    </Details>
  );
};
