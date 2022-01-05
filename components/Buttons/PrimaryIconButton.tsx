import { Component, MouseEventHandler } from "react";
import IconWrapper from "../Icon/Icon";

interface PrimaryIconButtonInterface {
  title: string;
  children: any;
  onClick: MouseEventHandler;
}

function PrimaryIconButton({ title, children, onClick }: PrimaryIconButtonInterface) {
  <button onClick={onClick}>
    {title}
    <IconWrapper>{children}</IconWrapper>
  </button>;
}

export default PrimaryIconButton;
