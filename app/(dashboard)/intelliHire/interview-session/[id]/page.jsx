import MainPage from "@/Components/Pages";

export const metadata = {
  title: "Interview Session - Instructions",
  description: "Read the instructions and check your devices before starting the interview.",
};

export default async function Page({ params }) {
  const { id } = await params;
  return <MainPage type="interviewIntro" jobId={id} />;
}
