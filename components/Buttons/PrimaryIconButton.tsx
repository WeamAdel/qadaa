import { Component, MouseEventHandler } from "react";
import IconWrapper from "../Icon/Icon";

interface PrimaryIconButtonInterface {
  title: string;
  children: any;
  onClick: MouseEventHandler;
  testId?: string;
}

function PrimaryIconButton({ title, children, onClick, testId = "" }: PrimaryIconButtonInterface) {
  return (
    <button
      className={`button button--primary button--icon`}
      onClick={onClick}
      data-testid={testId}
    >
      <IconWrapper>{children}</IconWrapper>
      {title}
    </button>
  );
}

export default PrimaryIconButton;
