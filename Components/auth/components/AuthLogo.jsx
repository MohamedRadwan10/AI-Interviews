import { get } from "lodash-es";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";
import logoImage from "@/public/assets/logo.png";

const AuthLogo = () => {
  const logo = get(logoImage, "src") || logoImage;

  return (
    <div className="flex items-center justify-center mb-4 w-full">
      <MainImage
        src={logo}
        alt="IntelliHire Logo"
        width={60}
        height={40}
        priority={true}
        imageClassName="object-contain"
        imageStyle={{ width: "auto", height: "auto" }}
      />
      <div className="flex">
        <MainText tag="h2" title="Intelli" className="text-3xl m-0 font-bold text-light-black dark:text-dark-white" />
        <MainText tag="h2" title="Hire"    className="text-3xl m-0 font-bold text-light-secondary dark:text-dark-secondary" />
      </div>
    </div>
  );
};

export default AuthLogo;