import React from "react";
import SectionHeader from "@/Components/Header/SectionHeader";
import FeatureCard from "@/Components/Cards/AboutFeature";
import { map } from "lodash-es";
import { AboutConfig } from "@/Config/AboutConfig";
import MainText from "@/Components/Common/MainText";

const MainComp = () => {
  const { brand, hero, why } = AboutConfig;

  return (
    <div className="min-h-screen font-sans">
      <section className="text-center py-16 px-6">
        <MainText
          tag="h2"
          title={brand.tagline}
          className="text-5xl font-bold text-light-black dark:text-dark-white mb-4  "
        />
        <MainText
          tag="p"
          title={brand.subtitle}
          className="text-sm max-w-md mx-auto font-semibold text-light-gray dark:text-dark-gray"
        />
      </section>

      <section className="px-32 py-10 w-full bg-light-main dark:bg-transparent">
        <SectionHeader title={hero.title} subtitle={hero.subtitle} />
        <div className="grid grid-cols-3 gap-6">
          {map(hero.cards, (card) => (
            <FeatureCard key={card.title} {...card} large />
          ))}
        </div>
      </section>

      <section className="px-32 py-10 w-full">
        <SectionHeader title={why.title} subtitle={why.subtitle} />
        <div className="grid grid-cols-3 gap-5">
          {map(why.cards, (card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainComp;
