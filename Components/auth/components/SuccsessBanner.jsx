import { CheckCircle2 } from "lucide-react";
import MainText from "@/Components/Common/MainText";

const AuthSuccessBanner = ({ title, subtitle }) => (
  <div className="w-full bg-status-success/10 border border-status-success/20 p-4 rounded-xl mb-6 flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-status-success mt-0.5" />
    <div>
      <MainText title={title}    className="block text-white font-bold text-sm" />
      <MainText title={subtitle} className="block text-dark-gray text-xs mt-1" />
    </div>
  </div>
);

export default AuthSuccessBanner;