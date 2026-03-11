import React from "react";

const MainText = ({
  title = "",
  tag = "span",
  className = "!select-none",
  useDefaultStyle = true,
  ...props
}) => {
  const Component = tag;
  const classes = `${useDefaultStyle ? "" : ""} ${className}`;

  return (
    <Component className={classes} {...props}>
      {title}
    </Component>
  );
};

export default MainText;
