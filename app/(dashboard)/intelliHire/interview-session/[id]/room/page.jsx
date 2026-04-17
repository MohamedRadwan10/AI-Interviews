import MainPage from "@/Components/Pages";

export const metadata = {
  title: "Interview Session - Room",
  description: "Participate in your AI-powered interview session.",
};

export default async function Page({ params }) {
  const { id } = await params;
  return <MainPage type="interviewRoom" jobId={id} />;
}
