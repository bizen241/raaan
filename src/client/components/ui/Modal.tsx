import * as React from "react";
import * as ReactModal from "react-modal";
import { styled } from "../../style";

interface Props extends ReactModal.Props {
  className?: string;
}

const ModalAdapter: React.FunctionComponent<Props> = ({ className, ...props }) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;

  return (
    <ReactModal
      closeTimeoutMS={300}
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

export const Modal = styled(ModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${p => p.theme.text}88;

    &.ReactModal__Overlay {
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    }

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    display: flex;
    position: absolute;
    top: 2%;
    right: 2%;
    bottom: 2%;
    left: 2%;
    background-color: ${p => p.theme.container};
    border-style: solid;
    border-width: 1px;
    border-color: ${p => p.theme.border};
    border-radius: 2px;
  }
`;
