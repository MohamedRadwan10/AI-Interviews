"use client";
import React from "react";
import { postJobConfig } from "@/Config/FieldsConfig";
import { useEditJob, useJobDetails } from "@/hooks/useJobs";
import SectionedForm from "@/Components/Common/SectionedForm";
import MainText from "@/Components/Common/MainText";
import { Edit3 } from "lucide-react";
import { get } from "lodash-es";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { formatDate } from "@/Utils/Func/Common";

const EditJobPage = (props) => {
  const jobId = get(props, "id");
  const { job, loading: isJobLoading } = useJobDetails(jobId);
  const { editJob, isLoading } = useEditJob(jobId);

  const initialValues = React.useMemo(() => {
    if (!job) return {};

    return {
      ...job,
      subCategory: job.subCtegory || job.subCategory,
      startedAt: formatDate(job.startDateTime || job.startedAt),
      endedAt: formatDate(job.endDateTime || job.endedAt),
      requiredSkills: job.skillsAndTools,
      requirements: job.jobrequirements,
    };
  }, [job]);

  if (isJobLoading) return <RouteLoading type="postJob" />;

  return (
    <div className="w-full py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
          <Edit3 className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <MainText title={"Edit Job Post"} className="text-3xl font-bold text-ui-textMain dark:text-dark-white" />
          <MainText title={`Updating: ${get(job, "title", "Job")}`} className="text-ui-textMuted dark:text-dark-gray text-sm mt-1" />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <SectionedForm config={postJobConfig} initialValues={initialValues} onSubmit={editJob} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default EditJobPage;
