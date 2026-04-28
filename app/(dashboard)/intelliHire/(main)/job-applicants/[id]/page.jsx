import MainPages from "@/Components/Pages";

export const metadata = {
  title: "Job Applicants",
  description: "View and manage candidates for this job position.",
};

export default async function Page({ params }) {
  const { id } = await params;
  return <MainPages type="JobApplicants" id={id} />;
}
