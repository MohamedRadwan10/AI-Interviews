import React from "react";
import { map } from "lodash-es";
import { HomeConfig } from "@/Config/HomeConfig";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Home = () => {
  const { hero, jobs, redefining } = HomeConfig;

  return (
    <div className="min-h-screen font-sans bg-light-primary dark:bg-dark-primary-1 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-24 pb-48 px-6 text-center overflow-hidden">
        {/* Curved Path Decoration */}
        <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 -z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full stroke-light-secondary/30 dark:stroke-blue-500/30 fill-none"
          >
            <path
              d="M0,160 Q720,480 1440,160"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
          
          {/* Path Icons */}
          {map(hero.pathIcons, (item, index) => (
            <div
              key={index}
              className={`absolute w-10 h-10 rounded-full bg-light-secondary dark:bg-blue-600 flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${item.className}`}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <MainText
            tag="h1"
            title={hero.title}
            className="text-4xl md:text-6xl font-extrabold text-light-black dark:text-dark-white mb-2 tracking-tight"
          />
          <MainText
            tag="h2"
            title={hero.subtitle}
            className="text-2xl md:text-3xl font-bold text-light-secondary dark:text-blue-400 mb-6"
          />
          <MainText
            tag="p"
            title={hero.desc}
            className="text-base md:text-lg text-light-gray dark:text-dark-gray max-w-2xl mx-auto mb-10 whitespace-pre-line leading-relaxed"
          />
          <MainButton
            className="p-button-rounded bg-light-secondary dark:bg-blue-600 hover:bg-blue-700 text-white border-none px-8 py-3.5 text-lg font-bold shadow-xl flex items-center gap-2 mx-auto transform hover:scale-105 transition-all"
          >
            {hero.cta} <ArrowRight className="w-5 h-5" />
          </MainButton>
        </div>
      </section>

      {/* Latest Job Opportunities */}
      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <MainText
                tag="h2"
                title={jobs.title}
                className="text-3xl font-bold text-light-black dark:text-dark-white mb-2"
              />
              <MainText
                tag="p"
                title={jobs.subtitle}
                className="text-light-gray dark:text-dark-gray font-medium"
              />
            </div>
            {/* Optional "View All" could go here if needed */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {map(jobs.list, (job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-dark-primary-3 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-dark-primary-1 flex items-center justify-center text-light-secondary dark:text-blue-400 font-bold text-xl border border-gray-100 dark:border-gray-700">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-light-black dark:text-dark-white text-lg">
                      {job.title}
                    </h3>
                    <p className="text-sm text-light-gray dark:text-dark-gray">
                      {job.company} • {job.type}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-light-gray dark:text-dark-gray mb-6 flex-grow leading-relaxed">
                  {job.desc}
                </p>
                <MainButton
                  className="p-button-outlined p-button-rounded w-full border-light-secondary/20 text-light-secondary dark:border-blue-500/20 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold py-2.5"
                >
                  See Details
                </MainButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redefining Section */}
      <section className="py-20 px-6 lg:px-32">
        <div className="container mx-auto bg-blue-50/50 dark:bg-dark-primary-3/30 rounded-[2.5rem] p-8 md:p-16 border border-blue-100/50 dark:border-gray-800 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <MainText
                tag="h2"
                title={redefining.title}
                className="text-3xl md:text-4xl font-extrabold text-light-black dark:text-dark-white mb-6 leading-tight"
              />
              <MainText
                tag="p"
                title={redefining.desc}
                className="text-light-gray dark:text-dark-gray mb-8 leading-relaxed text-lg"
              />
              <div className="space-y-4 mb-10">
                {map(redefining.bullets, (bullet, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-light-secondary dark:text-blue-400 flex-shrink-0" />
                    <span className="text-light-black dark:text-dark-white font-medium">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
              <MainButton
                className="p-button-rounded bg-light-secondary dark:bg-blue-600 hover:bg-blue-700 text-white border-none px-10 py-4 text-lg font-bold shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
              >
                {redefining.cta} <ArrowRight className="w-5 h-5" />
              </MainButton>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-light-secondary/10 dark:bg-blue-500/10 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
              <img
                src={redefining.image}
                alt="AI Illustration"
                className="w-full h-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;