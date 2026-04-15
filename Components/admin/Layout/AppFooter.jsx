import React from "react";
import Link from "next/link";
import { map, get } from "lodash-es";
import { DataConstant } from "@/Config/DataConstant";
import MainImage from "@/Components/Common/Image";
import logoImage from "@/public/assets/logo.png";
import MainText from "@/Components/Common/MainText";

const AppFooter = () => {
  const brand = get(DataConstant, "footer.brand", {});
  const sections = get(DataConstant, "footer.sections", []);
  const copyright = get(DataConstant, "footer.copyright", "");
  const desc = get(brand, "desc", "");
  const logo = get(logoImage, "src", logoImage);

  return (
    <footer className="w-full text-ui-muted py-12">
      <div className="border-t border-ui-border/50 mb-10 w-full"></div>
      <div className="w-full flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-[35%] flex flex-col gap-4">
          <div className="flex items-center gap-2 -ml-1">
             <MainImage
              src={logo}
              alt="Logo"
              imageClassName="max-h-12 max-w-24"
              preview={false}
            />
            <Link href="/intelliHire" className="flex">
              <MainText
                tag="h2"
                title="Intelli"
                className="text-2xl m-0 font-bold text-light-black dark:text-dark-white"
              />
              <MainText
                tag="h2"
                title="Hire"
                className="text-2xl m-0 font-bold text-light-secondary dark:text-dark-secondary"
              />
            </Link>
          </div>
          <MainText tag="p" title={desc} className="text-sm text-ui-muted leading-relaxed max-w-sm mt-2" />
        </div>

        <div className="w-full md:w-[60%] flex flex-wrap justify-between gap-8">
          {map(sections, (section, idx) => {
            const title = get(section, "title", "");
            const sectionLinks = get(section, "links") || get(section, "items") || [];
            
            return (
              <div key={idx} className="flex flex-col gap-4 min-w-[140px]">
                <MainText tag="h4" title={title} className="text-white font-medium" />
                <div className="flex flex-col gap-3">
                  {map(sectionLinks, (item, i) => {
                    const itemIcon = get(item, "icon");
                    const text = get(item, "text");
                    const href = get(item, "href");

                    const content = (
                      <>
                        {itemIcon && <i className={`${itemIcon} text-brand-primary text-[15px] w-4`} />}
                        <MainText tag="span" title={text} />
                      </>
                    );
                    const className = "text-sm text-ui-muted hover:text-light-gray transition-colors flex items-center gap-2.5";
                    
                    return href ? (
                      <Link key={i} href={href} className={className}>{content}</Link>
                    ) : (
                      <MainText key={i} tag="span" className={className}>{content}</MainText>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-ui-border/50 mt-12 pt-6 w-full text-center text-sm text-ui-textMuted">
        <MainText tag="p" title={copyright} />
      </div>
    </footer>
  );
};

export default AppFooter;
