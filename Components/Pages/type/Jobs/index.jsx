import React from "react";
import { map } from "lodash-es";
import Pagination from "@/Components/Common/Pagination";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainInput from "@/Components/Common/Inputs";
import { Search, SlidersHorizontal } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import MainCard from "@/Components/Common/Cards";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { JobsError } from "@/Components/Errors";

const JobsPage = () => {
  const { jobs, loading, error, searchTerm, setSearchTerm, page, setPage, totalCount } = useJobs();
 
  if (loading) return <RouteLoading type="jobs" />;
  if (error) return <JobsError error={error} />;

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <MainText tag="h1" title="Find Your Next Dream Job" className="text-3xl font-bold text-ui-textMain dark:text-white mb-6"/>
          <div className="flex justify-center max-w-3xl mx-auto gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ui-muted" />
              <MainInput
                type="text"
                placeholder="Job title, Keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fieldClassName="w-full pl-11 pr-4 py-3 rounded-xl border border-ui-borderLight dark:border-ui-border bg-white dark:bg-dark-primary-3 focus:outline-none focus:ring-0 text-ui-textMain dark:text-ui-muted"
              />
            </div>
            <MainButton className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-dark-primary-3 border border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted hover:bg-light-main dark:hover:bg-dark-primary-4 transition-colors font-medium">
              <SlidersHorizontal className="w-5 h-5" /> Filter
            </MainButton>
          </div>
        </div>

        <div className="mb-8">
          <MainText tag="h2" title="Latest Opportunities" className="text-xl font-semibold text-ui-textMain dark:text-ui-muted mb-6"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {map(jobs, (job) => (
                <div key={job?.jobid || job?.id}>
                  <MainCard type="job" job={job} />
                </div>
              ))}
            </div>
        </div>

        <Pagination 
          page={page} 
          limit={9} 
          totalRecords={totalCount} 
          onPageChange={setPage} 
        />
        <MainText title={`Showing ${jobs.length} out of ${totalCount} available opportunities`} className="flex justify-center text-sm text-ui-textMuted dark:text-ui-muted mt-2"/>
      </div>
    </div>
  );
};

export default JobsPage;
