import React, { useMemo } from "react";
import { map } from "lodash-es";
import { User, Mail, Phone, Eye, FileText } from "lucide-react";
import MainImage from "@/Components/Common/Image";
import CommonModal from "@/Components/Common/CommonModal";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { IMAGE_BASE_URL } from "@/Config/apiRegistry";
import { getVal as commonGetVal } from "@/Utils/Func/Common";
import { useReport } from "@/hooks/useReport";
import { useNavigation } from "@/hooks/common";

const Section = ({ title, children, className = "" }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <MainText title={title} className="text-sm text-ui-textMuted dark:text-dark-gray font-medium mb-1" />
    {children}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-light-white dark:bg-dark-primary-3 p-4 rounded-2xl border border-ui-borderLight dark:border-ui-border ${className}`}>{children}</div>
);

const PointList = ({ title, points, colorClass, iconColor }) => (
  <div className="flex flex-col gap-3">
    <MainText title={title} className={`text-sm font-bold ${colorClass}`} />
    <ul className="flex flex-col gap-3">
      {map(points, (p, i) => (
        <li key={i} className="flex gap-2 items-start">
          <MainText title="•" className={`${iconColor} mt-1`} />
          <MainText title={p} className="text-sm text-ui-textMuted dark:text-dark-gray leading-relaxed" />
        </li>
      ))}
    </ul>
  </div>
);

const ApplicantDetailsModal = ({ visible, applicant, onHide, updateStatus, isUpdating }) => {
  const { report, isLoading, strengthPoints: rawS, weaknessesPoints: rawW, accuracyPercent: acc, performanceLabel: perf } = useReport(applicant?.sessionId, applicant?.userId);
  const { navigateTo } = useNavigation();
  const getVal = (path, fallback) => commonGetVal(report, applicant, path, fallback);
  
  const fullName = getVal("fullName"), exp = getVal("yearsOfExperience"), email = getVal("email"), phone = getVal("phoneNumber");
  const avgTimeRaw = getVal("averageResponseTimeSeconds");
  const avgTime = typeof avgTimeRaw === "string" && avgTimeRaw.includes("s") ? avgTimeRaw : `${avgTimeRaw || 0} s`;
  
  const accText = useMemo(() => {
    return (perf || acc !== null) ? `${perf || ""} ${acc !== null ? `(${acc}%)` : ""}`.trim() : "N/A";
  }, [perf, acc]);
  
  const handleAction = async (status) => { if (await updateStatus(applicant.sessionId, status)) onHide(); };
  const onAccept = () => handleAction(0), onReject = () => handleAction(1);
  
  const photo = commonGetVal(applicant, null, "photo", "");
  const photoUrl = photo ? (photo.startsWith("http") ? photo : `${IMAGE_BASE_URL}${photo}`) : null;
  const sPoints = map(rawS?.split("|"), p => p.trim()).filter(Boolean), wPoints = map(rawW?.split("|"), p => p.trim()).filter(Boolean);
  const actions = [{ t: "View Report", i: <Eye size={18} />, onclick: () => navigateTo(`/intelliHire/report/${applicant?.sessionId}/${applicant?.userId}`) }, { t: "View CV", i: <FileText size={18} /> }];

  const loadingOverlay = useMemo(() => {
    if (!isLoading) return null;
    return (
      <div className="absolute inset-0 bg-light-primary/80 dark:bg-dark-primary-1/80 z-10 flex flex-col items-center justify-center rounded-b-2xl">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-3" />
        <MainText title="Loading Report..." className="text-ui-textMuted dark:text-dark-gray" />
      </div>
    );
  }, [isLoading]);

  const photoContent = useMemo(() => {
    if (photoUrl) {
      return <MainImage src={photoUrl} alt="avatar" width={56} height={56} className="object-cover" />;
    }
    return <User size={28} className="text-brand-primary" />;
  }, [photoUrl]);

  const strengthPointsContent = useMemo(() => {
    const points = sPoints.length ? sPoints : ["No strengths noted."];
    return <PointList title="Strength Points" points={points} colorClass="text-status-success" iconColor="text-status-success" />;
  }, [sPoints]);

  const weaknessPointsContent = useMemo(() => {
    const points = wPoints.length ? wPoints : ["No weaknesses noted."];
    return <PointList title="Weakness Points" points={points} colorClass="text-status-error" iconColor="text-status-error" />;
  }, [wPoints]);

  if (!applicant) return null;

  return (
    <CommonModal visible={visible} onHide={onHide} header="Candidate Details" width="800px" 
      contentClassName="bg-light-white dark:bg-dark-primary-3 text-ui-textMain dark:text-dark-white border-none p-0"
      headerClassName="bg-light-white dark:bg-dark-primary-3 text-ui-textMain dark:text-dark-white border-b border-ui-borderLight dark:border-ui-border rounded-t-2xl px-6 py-4">
      <div className="flex flex-col p-6 gap-6 bg-light-primary dark:bg-dark-primary-1 rounded-b-2xl relative min-h-[400px]">
        {loadingOverlay}
        <Section title="Contact Information">
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <Card className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-light-main dark:bg-dark-primary-4 flex items-center justify-center overflow-hidden border border-brand-primary/20 shrink-0">
                {photoContent}
              </div>
              <div><MainText tag="h3" title={fullName} className="text-lg font-bold text-ui-textMain dark:text-white leading-tight" /></div>
            </Card>
            <Card className="flex flex-col justify-center gap-2 flex-1 text-sm">
              <div className="flex justify-between"><MainText title="Years of experience :" className="text-ui-textMuted dark:text-dark-gray" /><MainText title={exp} className="font-semibold text-ui-textMain dark:text-white" /></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-ui-textMuted dark:text-dark-gray" /><MainText title={email} className="text-ui-textMain dark:text-white text-xs truncate max-w-[150px]" /></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-ui-textMuted dark:text-dark-gray" /><MainText title={phone} className="text-ui-textMain dark:text-white text-xs" /></div>
            </Card>
            <Card className="flex flex-col justify-center gap-3 flex-1">
              <div><MainText title="Avg. Response Time" className="text-xs text-ui-textMuted dark:text-dark-gray block mb-1" /><MainText title={avgTime} className="font-bold text-lg text-ui-textMain dark:text-white" /></div>
              <div className="flex justify-between items-center"><MainText title="Accuracy" className="text-xs text-ui-textMuted dark:text-dark-gray" /><MainText title={accText} className="text-xs font-bold text-status-success" /></div>
            </Card>
          </div>
        </Section>
        <Section title="Points Review">
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {strengthPointsContent}
            {weaknessPointsContent}
          </Card>
        </Section>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex gap-4">
            <MainButton title="Accept" loading={isUpdating} onClick={onAccept} className="flex-1 flex items-center justify-center bg-status-success text-white py-3 rounded-xl font-bold border-none" />
            <MainButton title="Reject" loading={isUpdating} onClick={onReject} className="flex-1 flex items-center justify-center bg-status-error text-white py-3 rounded-xl font-bold border-none" />
          </div>
          <div className="flex gap-4">
            {map(actions, (b) => (
              <MainButton key={b.t} title={b.t} icon={b.i} onClick={b.onclick} className="flex-1 flex items-center justify-center bg-brand-primary text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 border-none" />
            ))}
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default ApplicantDetailsModal;
