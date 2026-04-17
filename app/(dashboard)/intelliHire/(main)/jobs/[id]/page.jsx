import MainPages from "@/Components/Pages";

export const metadata = {
  title: "Job Details",
  description: "View detailed information about this job opening.",
};

export default async function Page({ params }) {
  const { id } = await params;
  return <MainPages type="jobDetails" jobId={id} />;
}
