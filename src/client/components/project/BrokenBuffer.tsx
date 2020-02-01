import { goBack } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityType } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { Button } from "../ui";

export const BrokenBuffer: React.FunctionComponent<{
  bufferType: EntityType;
  bufferId: string;
}> = ({ bufferType, bufferId }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.buffers.delete(bufferType, bufferId));
    dispatch(goBack());
  };

  return <Button label="戻る" onClick={onClick} />;
};
