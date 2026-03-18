import MainText from "@/Components/Common/MainText";

const FeatureCard = ({
  icon,
  title,
  desc,
  large = false,
  className,
  iconClassName,
}) => {
  return (
    <div
      className={`rounded-2xl p-6 flex flex-col items-center gap-3 border-none hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      <div
        className={`p-3 rounded-lg flex justify-center items-center dark:border ${iconClassName}`}
      >
        {icon}
      </div>
      <MainText
        tag="h3"
        title={title}
        className={`font-semibold text-light-black dark:text-dark-white ${large ? "text-lg" : "text-base"}`}
      />
      <MainText
        tag="p"
        title={desc}
        className="text-sm text-light-black dark:text-dark-white text-center leading-relaxed"
      />
    </div>
  );
};

export default FeatureCard;
