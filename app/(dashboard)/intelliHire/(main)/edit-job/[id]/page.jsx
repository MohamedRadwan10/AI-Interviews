import MainPage from "@/Components/Pages";

const page = ({ params }) => {
  return <MainPage type="EditJob" id={params.id} />;
};

export default page;
