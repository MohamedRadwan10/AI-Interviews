import { get } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { useNavigation } from "@/hooks/common";
import MainImage from "@/Components/Common/Image";
import { getImageUrl } from "@/Utils/Func/UrlHelper";

const JobItemCard = ({ data }) => {
  const { navigateTo } = useNavigation();
  
  const title = get(data, "title", "Unknown Title");
  const companyName = get(data, "companyName") || "Unknown Company";
  
  const defaultLogoText = (typeof companyName === "string" && companyName !== "Unknown Company" && companyName.length > 0)
    ? companyName.substring(0, 2).toUpperCase() 
    : "TC";
    
  const rawLogo = get(data, "companyLogo");
  const logoUrl = getImageUrl(rawLogo);
  const type = get(data, "type", get(data, "jobType", "Full Time"));
  const description = get(data, "description") || get(data, "desc", "");
  const jobId = get(data, "id");

  return (
    <div className="bg-white dark:bg-dark-primary-3 rounded-[2rem] p-8 shadow-sm border border-ui-borderLight dark:border-ui-border/50 hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 flex flex-col group h-full">
      <div className="flex items-start gap-5 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-ui-borderLight dark:border-ui-border bg-light-primary dark:bg-dark-primary-3 overflow-hidden shrink-0">
          {logoUrl ? (
            <MainImage 
              src={logoUrl} 
              alt={companyName}
              width={48}
              height={48}
              imageClassName="object-cover w-full h-full"
            />
          ) : (
            <span className="text-lg font-bold text-ui-textMuted dark:text-white">
              {defaultLogoText}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <MainText
            tag="h3"
            title={title}
            className="font-bold text-light-black dark:text-dark-white text-xl truncate mb-1 group-hover:text-brand-primary transition-colors"
          />
          <div className="flex items-center gap-2">
            <MainText
              tag="p"
              title={companyName}
              className="text-sm font-medium text-light-secondary dark:text-brand-accent"
            />
            <span className="text-ui-muted text-[10px]">●</span>
            <MainText
              tag="p"
              title={type}
              className="text-sm text-ui-textMuted dark:text-ui-muted"
            />
          </div>
        </div>
      </div>

      <MainText
        tag="p"
        title={description}
        className="text-sm text-ui-textMuted dark:text-ui-muted mb-8 flex-grow leading-relaxed line-clamp-3"
      />

      <MainButton 
        onClick={() => navigateTo(`/intelliHire/jobs/${jobId}`)} 
        className="w-full flex justify-center items-center py-4 bg-light-secondary dark:bg-dark-secondary text-white rounded-xl font-bold shadow-lg hover:shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
      >
        See Details
      </MainButton>
    </div>
  );
};

export default JobItemCard;
