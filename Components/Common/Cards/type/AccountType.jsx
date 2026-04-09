import { get } from "lodash-es";
import { useMemo } from "react";
import MainText from "../../MainText";

const AccountTypeCard = ({ item, selected, onSelect }) => {
  const type = get(item, "type");
  const title = get(item, "title");
  const description = get(item, "description");
  const icon = get(item, "icon");

  const active = selected === type;

  const cardClass = useMemo(() => {
    return `relative w-[320px] p-6 border rounded-xl cursor-pointer transition-all ${
      active
        ? "border-dark-primary-2 bg-light-blue50 dark:bg-dark-primary-3"
        : "border-light-gray dark:border-none dark:bg-dark-primary-3 bg-light-white hover:border-dark-primary-2"
    }`;
  }, [active]);

  const radioClass = useMemo(() => {
    return `absolute top-4 left-4 w-4 h-4 rounded-full border ${
      active
        ? "border-dark-primary-2 bg-dark-primary-2"
        : "border-dark-primary-2"
    }`;
  }, [active]);

  const iconWrapperClass = useMemo(() => {
    return `flex items-center justify-center w-12 h-12 rounded-full text-dark-primary-2 ${
      active
        ? "bg-light-white dark:bg-dark-primary-1"
        : "dark:bg-dark-primary-1 bg-light-primary"
    }`;
  }, [active]);

  const handleSelect = () => {
    if (type) {
      onSelect(type);
    }
  };

  return (
    <div onClick={handleSelect} className={cardClass}>
      <div className={radioClass} />

      <div className="flex justify-center mb-4">
        <div className={iconWrapperClass}>
          <i className={icon}></i>
        </div>
      </div>
      <div className="">
        <MainText
          tag="h2"
          title={title}
          className="text-light-black dark:text-dark-white font-semibold text-lg text-center mb-2"
        />

        <MainText
          tag="p"
          title={description}
          className="text-light-gray dark:text-dark-gray text-sm text-center"
        />
      </div>
    </div>
  );
};

export default AccountTypeCard;
