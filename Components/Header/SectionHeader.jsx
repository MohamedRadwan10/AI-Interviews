import MainText from "@/Components/Common/MainText";

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center max-w-xl mx-auto mb-12">
    <MainText
      tag="h2"
      title={title}
      className="text-3xl text-light-black dark:text-dark-white mb-3"
    />
    <MainText tag="p" title={subtitle} className="text-sm text-light-gray dark:text-dark-gray font-semibold leading-relaxed" />
  </div>
);

export default SectionHeader;
