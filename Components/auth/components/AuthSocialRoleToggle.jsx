import { User, Building2 } from "lucide-react";
import MainButton from "@/Components/Common/MainButton";
import MainText from "@/Components/Common/MainText";

const ROLES = [
  { value: 0, label: "Candidate", Icon: User },
  { value: 1, label: "Employer",  Icon: Building2 },
];

const AuthSocialRoleToggle = ({ socialRole, onRoleChange }) => (
  <div className="flex p-1 bg-light-primary dark:bg-dark-primary-1 rounded-xl mb-4 border border-light-gray/20 dark:border-dark-gray/20">
    {ROLES.map(({ value, label, Icon }) => {
      const isActive = socialRole === value;
      const handleClick = () => onRoleChange(value);
      return (
        <MainButton
          key={value}
          type="button"
          onClick={handleClick}
          className={`flex items-center justify-center gap-2 flex-1 py-2 px-4 rounded-lg transition-all ${
            isActive
              ? "bg-light-white dark:bg-dark-primary-3 text-light-secondary dark:text-dark-secondary shadow-sm"
              : "text-ui-muted hover:text-light-black dark:hover:text-dark-white"
          }`}
        >
          <Icon className="w-4 h-4" />
          <MainText title={label} className="text-sm font-medium" />
        </MainButton>
      );
    })}
  </div>
);

export default AuthSocialRoleToggle;