"use client";
import React from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { useProfessionalProfile } from "@/hooks/useProfessionalProfile";
import ProfileHeader from "./comps/ProfileHeader";
import ExperienceSection from "./comps/ExperienceSection";
import ProjectsSection from "./comps/ProjectsSection";
import SkillsSection from "./comps/SkillsSection";
import CertificationsSection from "./comps/CertificationsSection";
import EducationSection from "./comps/EducationSection";
import { ErrorMessage } from "formik";
import MainButton from "@/Components/Common/MainButton";
import { ArrowLeft } from "lucide-react";
import { useNavigation } from "@/hooks/common";

export const CvPage = ({userId}) => {
  const { fullName, jobTitle, email, phoneNumber, photoUrl, workExperiences, skills, certifications, projects, education, loading, error } = useProfessionalProfile(userId);
  const { navigateBack } = useNavigation();
  const backIcon = <ArrowLeft className="w-4 h-4" />;

  if (loading) return <RouteLoading type="cv" />;
  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <MainButton
          onClick={navigateBack}
          className="flex items-center gap-2 w-fit text-sm font-medium text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors focus:ring-0"
          icon={backIcon}
          title={"Back"}
        />

        <ProfileHeader 
          fullName={fullName}
          jobTitle={jobTitle}
          email={email}
          phoneNumber={phoneNumber}
          photoUrl={photoUrl}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ExperienceSection workExperiences={workExperiences} />
            <ProjectsSection projects={projects} />
            <EducationSection education={education} />
          </div>

          <div className="flex flex-col gap-8">
            <SkillsSection skills={skills} />
            <CertificationsSection certifications={certifications} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CvPage;
