import React, { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { useJobDetails } from "@/hooks/useJobs";
import { useNavigation } from "@/hooks/common"; 
import MainCard from "@/Components/Common/Cards";
import MainButton from "@/Components/Common/MainButton";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { JobDetailsError } from "@/Components/Errors";

const JobDetailsContent = ({ jobId }) => {
  const { navigateBack } = useNavigation();
  const { job, loading, error } = useJobDetails(jobId);

  if (loading) return <RouteLoading type="jobDetails" />;

  if (!loading && error) return <JobDetailsError error={error} />;

  if (!loading && !job) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-ui-textMuted dark:text-ui-muted font-medium">Job not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary-1 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        <MainButton 
          onClick={navigateBack}
          className="flex items-center gap-2 text-sm font-medium text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </MainButton>

        <div className="flex flex-col gap-6">
          <MainCard type="jobHeader" data={job} />
          <MainCard type="jobSpecs" data={job} />
          <MainCard type="jobContent" data={job} />
        </div>
        
      </div>
    </div>
  );
};

const JobDetailsPage = (props) => {
  return (
    <Suspense fallback={<RouteLoading type="jobDetails" />}>
      <JobDetailsContent {...props} />
    </Suspense>
  );
};

export default JobDetailsPage;
