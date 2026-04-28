import MainPage from "@/Components/Pages";
import RoleGuard from "@/Components/Common/RoleGuard";

const page = () => {
  return (
    <RoleGuard allowedRoles={["Company"]}>
      <MainPage type="post-job" />
    </RoleGuard>
  );
};

export default page;
