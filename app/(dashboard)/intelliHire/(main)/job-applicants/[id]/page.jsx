import MainPages from "@/Components/Pages";
import RoleGuard from "@/Components/Common/RoleGuard";

export const metadata = {
  title: "Job Applicants",
  description: "View and manage candidates for this job position.",
};

export default async function Page({ params }) {
  const { id } = await params;
  return (
    <RoleGuard allowedRoles={["Company"]}>
      <MainPages type="JobApplicants" id={id} />
    </RoleGuard>
  );
}
