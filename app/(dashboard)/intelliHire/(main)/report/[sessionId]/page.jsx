import MainPages from "@/Components/Pages";

export const metadata = {
  title: "Interview Report",
  description: "View your detailed AI interview performance report.",
};

export default async function Page({ params }) {
  const { sessionId } = await params;
  return <MainPages type="report" sessionId={sessionId} />;
}
