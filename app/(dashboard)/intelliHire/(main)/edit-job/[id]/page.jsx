import MainPage from "@/Components/Pages";

const page = async ({ params }) => {
  const { id } = await params;
  return <MainPage type="EditJob" id={id} />;
};

export default page;
