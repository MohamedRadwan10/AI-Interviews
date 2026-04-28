import MainPage from "@/Components/Pages";
import RoleGuard from "@/Components/Common/RoleGuard";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <RoleGuard allowedRoles={["Company"]}>
      <MainPage type="EditJob" id={id} />
    </RoleGuard>
  );
};

export default page;
