import MainButton from "@/Components/Common/MainButton";
import MainImage from "@/Components/Common/Image";

const SOCIAL_PROVIDERS = [
  {
    key: "google",
    label: "Google",
    icon: "https://www.svgrepo.com/show/475656/google-color.svg",
  },
  {
    key: "microsoft",
    label: "Microsoft",
    icon: "https://www.svgrepo.com/show/448239/microsoft.svg",
  },
];

const AuthSocialButtons = ({ onSocialLogin }) => (
  <div className="flex gap-4">
    {SOCIAL_PROVIDERS.map(({ key, label, icon }) => {
      const handleClick = () => onSocialLogin(key);
      return (
        <MainButton
          key={key}
          type="button"
          onClick={handleClick}
          className="flex items-center justify-center gap-2 flex-1 dark:bg-dark-primary-1 bg-light-primary py-2 rounded-md text-light-black dark:text-dark-white"
        >
          <MainImage src={icon} alt={`${label} Logo`} width={20} height={20} priority imageClassName="object-contain" />
          {label}
        </MainButton>
      );
    })}
  </div>
);

export default AuthSocialButtons;