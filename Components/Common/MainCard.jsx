import { map } from "lodash-es";
import MainText from "@/Components/Common/MainText";
import MainImage from "@/Components/Common/Image";
import { VARIANTS } from "@/Config/CardConfig";

const UniversalUI = ({ variant, data, children, onClick }) => {
  const cfg = VARIANTS[variant] || VARIANTS.STAT;
  const { 
    title, subtitle, value, label, icon: Icon, image,
    color = "text-brand-primary", bg = "bg-brand-primary/10", 
    list = [], tags = [], footer 
  } = data || {};

  return (
    <div onClick={onClick} className={`rounded-[24px] transition-all duration-300 ${cfg.container} ${onClick ? "cursor-pointer" : ""}`}>
      
      {/* Top Section: Icon/Image + Header */}
      <div className={`flex ${cfg.headerLayout || "flex-col"} gap-4 w-full`}>
        {image && (
          <div className={`shrink-0 overflow-hidden ${cfg.imageWrapper || "w-14 h-14 rounded-xl border border-ui-borderLight dark:border-ui-border bg-light-primary dark:bg-dark-primary-3 flex items-center justify-center"}`}>
            <MainImage src={image} alt={title} width={64} height={64} imageClassName="object-cover w-full h-full" />
          </div>
        )}
        
        {Icon && !image && (
          <div className={`shrink-0 flex items-center justify-center ${cfg.iconWrapper} ${bg}`}>
            <Icon size={24} className={color} />
          </div>
        )}

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {title && <MainText title={title} className={cfg.title} />}
          {subtitle && (typeof subtitle === "string" ? <MainText title={subtitle} className={cfg.subtitle} /> : subtitle)}
          
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {value && <MainText title={value} className={cfg.value || ""} />}
            {label && <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase ${cfg.labelClass || "bg-white/20"}`}>{label}</span>}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      {tags.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${cfg.tagsContainer || "mt-4"}`}>
          {map(tags, (tag, i) => (
            <span key={i} className={cfg.tag || "px-3 py-1 rounded-full text-xs border border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted"}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* List Section */}
      {list.length > 0 && (
        <div className={cfg.grid || "mt-4 space-y-2"}>
          {map(list, (item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {item.icon && <span className="p-1.5 rounded-lg bg-light-primary dark:bg-dark-primary-3">{item.icon}</span>}
              <MainText title={item.text} className="truncate" />
            </div>
          ))}
        </div>
      )}

      {children}
      {footer && <div className={cfg.footer || "mt-6 pt-4 border-t border-ui-borderLight dark:border-ui-border"}>{footer}</div>}
    </div>
  );
};

export default UniversalUI;