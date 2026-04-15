import { get } from "lodash-es";
import MainText from "../../MainText";
import MainButton from "../../MainButton";

const JobItemCard = (props) => {
  const logo = get(props, "logo");
  const title = get(props, "title");
  const company = get(props, "company");
  const type = get(props, "type");
  const desc = get(props, "desc");

  return (
    <div className="bg-white dark:bg-dark-primary-3 rounded-2xl p-6 shadow-sm border border-ui-borderLight dark:border-ui-border hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-light-primary dark:bg-dark-primary-1 flex items-center justify-center text-light-secondary dark:text-brand-accent font-bold text-xl border border-ui-borderLight dark:border-ui-border">
          {logo}
        </div>
        <div>
          <MainText
            tag="h3"
            title={title}
            className="font-bold text-light-black dark:text-dark-white text-lg"
          />
          <MainText
            tag="p"
            title={`${company} • ${type}`}
            className="text-sm text-light-gray dark:text-dark-gray"
          />
        </div>
      </div>
      <MainText
        tag="p"
        title={desc}
        className="text-sm text-light-gray dark:text-dark-gray mb-6 flex-grow leading-relaxed"
      />
      <MainButton className="p-button-outlined p-button-rounded cursor-pointer flex justify-center items-center bg-dark-secondary text-dark-white hover:bg-dark-secondary/70 font-bold py-2.5">
        See Details
      </MainButton>
    </div>
  );
};

export default JobItemCard;
