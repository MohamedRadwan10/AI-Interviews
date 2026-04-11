"use client";
import React from "react";
import { map, get } from "lodash-es";
import { DataConstant } from "@/Config/DataConstant";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { CheckCircle2, ArrowRight } from "lucide-react";
import MainCard from "@/Components/Common/Cards";
import HeroCurve from "@/Components/Common/HeroCurve";
// import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  // const { userData } = useAuth();
  // console.log("User Data:", userData);
  const homeData = get(DataConstant, "home", {});
  const hero = get(homeData, "hero", {});
  const latestJobs = get(homeData, "latestJobs", {});
  const redefining = get(homeData, "redefining", {});
  const pathIcons = get(hero, "pathIcons", []);
  const jobItems = get(latestJobs, "items", []);
  const bullets = get(redefining, "bullets", []);

  return (
    <div className="min-h-screen font-sans bg-light-primary dark:bg-dark-primary-1 transition-colors duration-300">
      <section className="relative pt-24 pb-48 px-6 text-center overflow-hidden">
        <HeroCurve pathIcons={pathIcons} />
        <div className="container mx-auto max-w-4xl relative z-20">
          <MainText tag="h1" title={get(hero, "title")} className="text-4xl md:text-6xl font-extrabold text-light-black dark:text-dark-white mb-2 tracking-tight" />
          <MainText tag="h2" title={get(hero, "subtitle")} className="text-2xl md:text-3xl font-bold text-light-secondary dark:text-blue-400 mb-6" />
          <MainText tag="p" title={get(hero, "desc")} className="text-base md:text-lg text-light-gray dark:text-dark-gray max-w-2xl mx-auto mb-10 whitespace-pre-line leading-relaxed" />
          <MainButton className="p-button-rounded bg-light-secondary dark:bg-blue-600 hover:bg-blue-700 text-white border-none px-8 py-3.5 text-lg font-bold shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105 transition-all">
            {get(hero, "cta")} <ArrowRight className="w-5 h-5" />
          </MainButton>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <MainText tag="h2" title={get(latestJobs, "title")} className="text-3xl font-bold text-light-black dark:text-dark-white mb-2" />
              <MainText tag="p" title={get(latestJobs, "subtitle")} className="text-light-gray dark:text-dark-gray font-medium" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {map(jobItems, (job) => {
              const jobId = get(job, "id");
              return <MainCard key={jobId} type="job" data={job} />;
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto bg-blue-50/50 dark:bg-dark-primary-3/30 rounded-[2.5rem] p-8 md:p-16 border border-blue-100/50 dark:border-gray-800 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <MainText tag="h2" title={get(redefining, "title")} className="text-3xl md:text-4xl font-extrabold text-light-black dark:text-dark-white mb-6 leading-tight" />
              <MainText tag="p" title={get(redefining, "desc")} className="text-light-gray dark:text-dark-gray mb-8 leading-relaxed text-lg" />
              <div className="space-y-4 mb-10">
                {map(bullets, (bullet, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-light-secondary dark:text-blue-400 flex-shrink-0" />
                    <span className="text-light-black dark:text-dark-white font-medium">{bullet}</span>
                  </div>
                ))}
              </div>
              <MainButton className="p-button-rounded bg-light-secondary dark:bg-blue-600 hover:bg-blue-700 text-white border-none px-10 py-4 text-lg font-bold shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all">
                {get(redefining, "cta")} <ArrowRight className="w-5 h-5" />
              </MainButton>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-light-secondary/10 dark:bg-blue-500/10 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
              <img src={get(redefining, "image")} alt="AI Illustration" className="w-full h-auto relative z-10 drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;