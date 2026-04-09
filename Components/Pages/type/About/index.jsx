import React from "react";
import SectionHeader from "@/Components/Header/SectionHeader";
import { map, get } from "lodash-es";
import { DataConstant } from "@/Config/DataConstant";
import MainText from "@/Components/Common/MainText";
import MainCard from "@/Components/Common/Cards";

const MainComp = () => {
  const aboutData = get(DataConstant, "about", {});
  const brand = get(aboutData, "brand", {});
  const hero = get(aboutData, "hero", {});
  const why = get(aboutData, "why", {});
  const heroCards = get(hero, "cards", []);
  const whyCards = get(why, "cards", []);

  return (
    <div className="min-h-screen font-sans">
      <section className="text-center py-16 px-6">
        <MainText tag="h2" title={get(brand, "tagline")} className="text-5xl font-bold text-light-black dark:text-dark-white mb-4" />
        <MainText tag="p" title={get(brand, "subtitle")} className="text-sm max-w-md mx-auto font-semibold text-light-gray dark:text-dark-gray" />
      </section>

      <section className="px-32 py-10 w-full bg-light-main dark:bg-transparent">
        <SectionHeader title={get(hero, "title")} subtitle={get(hero, "subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {map(heroCards, (card) => {
            const cardTitle = get(card, "title");
            return <MainCard key={cardTitle} type="feature" data={card} />;
          })}
        </div>
      </section>

      <section className="px-32 py-10 w-full">
        <SectionHeader title={get(why, "title")} subtitle={get(why, "subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {map(whyCards, (card) => {
            const cardTitle = get(card, "title");
            return <MainCard key={cardTitle} type="feature" data={card} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default MainComp;
