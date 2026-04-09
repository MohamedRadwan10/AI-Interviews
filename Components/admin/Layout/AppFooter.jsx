import MainText from "@/Components/Common/MainText";
import React from "react";
import { footerConfig } from "@/Config/LayoutConfig";
import { map, get } from "lodash-es";

const AppFooter = () => {
  const brand = get(footerConfig, "brand", {});
  const sections = get(footerConfig, "sections", []);
  const contact = get(footerConfig, "contact", {});
  const copyright = get(footerConfig, "copyright", {});
  const styles = get(footerConfig, "styles", {});

  const logo = get(brand, "logo", {});
  const textStyles = get(styles, "text", {});

  return (
    <footer className={get(styles, "footer")}>
      <div className={get(styles, "container")}>
        <div className={get(styles, "grid")}>
          <div className="space-y-4">
            <MainText
              tag="h3"
              title={get(brand, "name")}
              className={get(logo, "className")}
            />
            <MainText
              tag="p"
              title={get(brand, "tagline")}
              className="text-gray-300 text-sm leading-relaxed"
            />
          </div>

          {map(sections, (section, index) => {
            const links = get(section, "links", []);
            return (
              <div key={index} className="space-y-4">
                <MainText
                  tag="h4"
                  title={get(section, "title")}
                  className="text-lg font-semibold text-white mb-4"
                />
                <ul className="space-y-2">
                  {map(links, (link, idx) => (
                    <li key={idx}>
                      <a
                        href={get(link, "path")}
                        className={`${get(textStyles, "muted")} ${get(
                          textStyles,
                          "hover",
                        )} transition-colors duration-200 text-sm`}
                      >
                        {get(link, "label")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="space-y-4">
            <MainText
              tag="h4"
              title={get(contact, "title")}
              className="text-lg font-semibold text-white mb-4"
            />
            <ul className="space-y-3">
              {map(get(contact, "items", []), (item, index) => {
                const IconComponent = get(item, "icon");
                const type = get(item, "type");
                return (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-400 text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>
                      {type === "email" || type === "phone" ? (
                        <a
                          href={get(item, "href")}
                          className={`${get(
                            textStyles,
                            "hover",
                          )} transition-colors duration-200`}
                        >
                          {get(item, "text")}
                        </a>
                      ) : (
                        get(item, "text")
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className={`${get(
            styles,
            "border",
          )} mt-8 pt-6 text-center text-gray-500 text-sm`}
        >
          <MainText tag="p">
            &copy; {get(copyright, "year")} {get(copyright, "text")}.{" "}
            {get(copyright, "rights")}
          </MainText>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
