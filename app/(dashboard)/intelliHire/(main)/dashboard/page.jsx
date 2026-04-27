import MainPages from "@/Components/Pages";

export const metadata = {
  title: "Candidate Dashboard",
  description: "View your interview statistics, progress, and history.",
};

export default function Page() {
  return <MainPages type="dashboard" compType="candidate" />;
}
