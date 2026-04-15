import { Button } from "primereact/button";

const MainButton = ({
  onClick,
  type = "button",
  containerClass = "",
  children,
  value = "",
  title = "",
  isLoading = false,
  ...props
}) => {
  return (
    <Button type={type} value={value} onClick={onClick} loading={isLoading} {...props}>
      {children ||
        (title && (
          <section className={containerClass}>
            <span>title</span>
          </section>
        ))}
    </Button>
  );
};

export default MainButton;
