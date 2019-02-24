import { ButtonGroup, Classes, Collapse } from "@blueprintjs/core";
import * as React from "react";
import { Details } from "./Details";
import { Column } from "./Flex";
import { Summary } from "./Summary";

export const List: React.FunctionComponent<{
  title: string;
  currentPageNumber: number;
  totalItemCount: number;
  itemCountPerPage: number;
  focusKey: string;
  isOpen: boolean;
}> = ({ title, currentPageNumber, totalItemCount, itemCountPerPage, focusKey, isOpen, children }) => {
  const pageCount = Math.ceil(totalItemCount / itemCountPerPage);

  const pagination =
    pageCount !== 1 ? (
      <Column padding="small">
        <ButtonGroup fill>
          <button className={`${Classes.BUTTON} ${Classes.iconClass("double-chevron-left")}`} />
          <button className={`${Classes.BUTTON} ${Classes.iconClass("chevron-left")}`} />
          <button className={`${Classes.BUTTON} ${Classes.DISABLED}`}>
            {currentPageNumber}/{pageCount}}
          </button>
          <button className={`${Classes.BUTTON} ${Classes.iconClass("chevron-right")}`} />
          <button className={`${Classes.BUTTON} ${Classes.iconClass("double-chevron-right")}`} />
        </ButtonGroup>
      </Column>
    ) : null;

  return (
    <Details>
      <Summary title={title} focusKey={focusKey} />
      <Collapse isOpen={isOpen}>
        {children}
        {pagination}
      </Collapse>
    </Details>
  );
};
