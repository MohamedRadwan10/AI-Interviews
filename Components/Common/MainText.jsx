import React from "react";

const MainText = ({
  title = "",
  tag = "span",
  className = "!select-none",
  useDefaultStyle = true,
  children,
  ...props
}) => {
  const Component = tag;
  const classes = `${useDefaultStyle ? "" : ""} ${className} !select-none`;

  return (
    <Component className={classes} {...props}>
      {children || title}
    </Component>
  );
};

export default MainText;
