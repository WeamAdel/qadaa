interface IconInterface {
  children: JSX.Element;
  classes?: string;
}

function Icon({ children, classes = "" }: IconInterface) {
  return <span className={`icon ${classes}`}>{children}</span>;
}

export default Icon;
