"use client";
import MainButton from "@/Components/Common/MainButton";
import { ChevronRight } from "lucide-react";
import { NAVIGATION_ROUTES } from "@/Config/navigationConfig";
import { useNavigation } from "@/hooks/common";

const FormActions = ({ 
  sections, 
  activeTab, 
  setActiveTab, 
  isValid, 
  isSubmitting, 
  isLoading, 
  submitButtonText 
}) => {
  const { navigateTo } = useNavigation();
  const currentIndex = sections.findIndex(s => s.id === activeTab);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  const onPrevious = () => setActiveTab(sections[currentIndex - 1]?.id);
  const onNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveTab(sections[currentIndex + 1]?.id);
  };
  const onCancel = () => navigateTo(NAVIGATION_ROUTES.candidate.jobs);
  const nextIcon = <ChevronRight className="w-4 h-4" />;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 px-2">
      <div className="flex items-center gap-4">
        {!isFirst && (
          <MainButton type="button" onClick={onPrevious} className="px-6 py-3 text-sm font-semibold text-ui-textMain dark:text-white bg-white dark:bg-dark-primary-2 border border-ui-borderLight dark:border-dark-gray rounded-2xl hover:bg-light-primary dark:hover:bg-white/5 transition-all" title="Previous Step" />
        )}
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <MainButton type="button" onClick={onCancel} className="flex-1 sm:flex-none px-8 py-3 text-sm font-semibold text-ui-textMuted dark:text-ui-muted hover:text-ui-textMain dark:hover:text-white transition-colors" title="Cancel" />
        {!isLast ? (
          <MainButton key="next-step-btn" type="button" onClick={onNext} className="flex-1 sm:flex-none px-8 py-3 bg-brand-primary text-white rounded-2xl hover:shadow-lg hover:shadow-brand-primary/30 transition-all font-bold flex items-center gap-2" title="Next Step" icon={nextIcon} />
        ) : (
          <MainButton key="submit-job-btn" type="submit" className="flex-1 sm:flex-none px-10 py-3 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all font-bold disabled:opacity-50" disabled={isSubmitting || isLoading} isLoading={isLoading || isSubmitting} title={submitButtonText} />
        )}
      </div>
    </div>
  );
};

export default FormActions;
