import MainText from "@/Components/Common/MainText";
import React from "react";
import { footerConfig } from "@/Config/LayoutConfig";
import { map } from "lodash-es";

const AppFooter = () => {
  const { brand, sections, contact, copyright, styles } = footerConfig;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className="space-y-4">
            <MainText
              tag="h3"
              title={brand.name}
              className={brand.logo.className}
            />
            <MainText
              tag="p"
              title={brand.tagline}
              className="text-gray-300 text-sm leading-relaxed"
            />
          </div>

          {map(sections, (section, index) => (
            <div key={index} className="space-y-4">
              <MainText
                tag="h4"
                title={section.title}
                className="text-lg font-semibold text-white mb-4"
              />
              <ul className="space-y-2">
                {map(section.links, (link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className={`${styles.text.muted} ${styles.text.hover} transition-colors duration-200 text-sm`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <MainText
              tag="h4"
              title={contact.title}
              className="text-lg font-semibold text-white mb-4"
            />
            <ul className="space-y-3">
              {map(contact.items, (item, index) => {
                const IconComponent = item.icon;
                return (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-400 text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>
                      {item.type === "email" || item.type === "phone" ? (
                        <a
                          href={item.href}
                          className={`${styles.text.hover} transition-colors duration-200`}
                        >
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className={`${styles.border} mt-8 pt-6 text-center text-gray-500 text-sm`}
        >
          <p>
            &copy; {copyright.year} {copyright.text}. {copyright.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
