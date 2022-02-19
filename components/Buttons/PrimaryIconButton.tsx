import { Component, MouseEventHandler } from "react";
import IconWrapper from "../Icon/Icon";

interface PrimaryIconButtonInterface {
  title: string;
  children: any;
  onClick: MouseEventHandler;
}

function PrimaryIconButton({ title, children, onClick }: PrimaryIconButtonInterface) {
  return (
    <button className={`button button--primary button--icon`} onClick={onClick}>
      <IconWrapper>{children}</IconWrapper>
      {title}
    </button>
  );
}

export default PrimaryIconButton;
