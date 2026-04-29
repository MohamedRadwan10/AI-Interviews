export const VARIANTS = {
  STAT: {
    container:
      "bg-white dark:bg-dark-primary-3 p-8 border hover:shadow-lg flex justify-between items-center rounded-[24px]",
    title: "text-lg font-medium text-ui-textMuted",
    value: "text-4xl font-bold text-ui-textMain dark:text-dark-white",
    iconWrapper: "w-12 h-12 rounded-xl",
    labelClass: "bg-brand-primary/10 text-brand-primary",
  },

  JOB_LIST: {
    container:
      "flex-col justify-between p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border hover:shadow-md h-full",
    headerLayout: "flex-row items-start",
    imageWrapper:
      "w-12 h-12 rounded-xl border bg-light-primary dark:bg-dark-primary-3 flex items-center justify-center",
    title: "font-semibold text-lg text-ui-textMain dark:text-white",
    subtitle:
      "flex items-center gap-2 text-ui-textMuted dark:text-ui-muted text-sm mt-0.5",
    tagsContainer: "flex flex-wrap gap-2 mt-4",
    tag:
      "px-3 py-1 rounded-full text-xs border border-ui-borderLight dark:border-ui-border text-ui-textMuted dark:text-ui-muted bg-light-main dark:bg-dark-primary-3",
    footer:
      "flex items-center justify-between pt-4 border-t border-ui-borderLight dark:border-ui-border mt-auto",
  },

  JOB_HEADER: {
    container:
      "flex-col md:flex-row justify-between items-start p-6 rounded-2xl bg-white dark:bg-dark-primary-4 border shadow-sm h-full mb-6 gap-6",
    headerLayout: "flex-row items-start",
    imageWrapper:
      "w-16 h-16 rounded-xl border bg-light-primary dark:bg-dark-primary-3 flex items-center justify-center",
    title: "font-semibold text-2xl text-ui-textMain dark:text-white",
    subtitle:
      "flex flex-wrap items-center gap-2 text-ui-textMuted dark:text-ui-muted text-sm mt-1",
  },

  PERFORMANCE_BANNER: {
    container:
      "bg-brand-primary p-6 shadow-lg text-white flex-col justify-between h-full rounded-2xl",
    title: "text-sm font-medium opacity-90",
    value: "text-4xl font-black",
  },

  PAGE_HEADER: {
    container:
      "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8",
    title: "text-3xl font-bold text-ui-textMain dark:text-white",
    subtitle: "text-ui-textMuted dark:text-ui-muted",
  },

  SECTION_CENTER: {
    container: "text-center max-w-xl mx-auto mb-12",
    title: "text-3xl font-bold mb-3 dark:text-white",
    subtitle:
      "text-sm font-semibold text-ui-textMuted dark:text-ui-muted",
  },

  CANDIDATE_INFO: {
    container:
      "grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-dark-primary-4 border rounded-2xl",
    imageWrapper: "w-24 h-24 rounded-full overflow-hidden flex items-center justify-center",
    title: "text-2xl font-semibold text-ui-textMain dark:text-white",
    subtitle: "text-sm text-ui-textMuted dark:text-ui-muted",
    infoGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4",
    infoItem: "flex flex-col",
    label: "font-medium text-ui-textMuted dark:text-ui-muted",
    value: "text-base text-ui-textMain dark:text-white",
  },

  METRICS_SUMMARY: {
    container:
      "flex items-center justify-between p-6 bg-white dark:bg-dark-primary-4 border rounded-2xl",
    metric: "flex-1 text-center",
    metricValue: "text-2xl font-bold text-ui-textMain dark:text-white",
    metricLabel: "text-sm text-ui-textMuted dark:text-ui-muted",
    separator: "w-px h-12 bg-ui-borderLight dark:bg-ui-border mx-4",
  },

  REPORT_QUESTION_LIST: {
    container:
      "bg-white dark:bg-dark-primary-4 border border-ui-borderLight dark:border-ui-border rounded-2xl mb-6",
    header:
      "flex items-center justify-between p-4 border-b border-ui-borderLight dark:border-ui-border",
    headerTitle: "text-lg font-semibold text-ui-textMain dark:text-white",
    legend: "flex items-center gap-2",
    legendItem: "flex items-center gap-1",
    legendIcon: "w-3 h-3",
    legendLabel: "text-xs text-ui-textMuted dark:text-ui-muted",
    body: "p-4",
  },

  ACCOUNT_TYPE: {
    container:
      "flex flex-col items-center p-6 bg-white dark:bg-dark-primary-4 border rounded-2xl",
    iconWrapper:
      "w-12 h-12 rounded-full bg-light-main dark:bg-dark-primary-3 flex items-center justify-center",
    title: "mt-3 text-lg font-medium text-ui-textMain dark:text-white",
    description:
      "mt-1 text-sm text-ui-textMuted dark:text-ui-muted text-center",
    selectedBorder: "border-2 border-brand-primary",
  },

  FEATURE_CARD: {
    container:
      "flex flex-col items-center p-6 bg-white dark:bg-dark-primary-4 border rounded-2xl hover:shadow-lg transition-shadow duration-200",
    iconWrapper:
      "w-12 h-12 rounded-full bg-light-main dark:bg-dark-primary-3 flex items-center justify-center mb-4",
    title: "text-lg font-semibold text-ui-textMain dark:text-white",
    description:
      "mt-2 text-sm text-ui-textMuted dark:text-ui-muted text-center",
  },

  ANALYSIS_TIPS: {
    container:
      "bg-white dark:bg-dark-primary-4 p-6 rounded-2xl border",
    tipItem: "flex items-start gap-2 mb-3",
    icon: "w-5 h-5 text-brand-primary",
    text: "text-sm text-ui-textMain dark:text-white",
  },
};
