import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import MyClassesInfo from "../../features/dashboard/classes/components/MyClassesInfo";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";
import { getMe } from "../../services/userAPI";

function MyClasses() {
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isPending) return <Spinner />;

  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <MyClassesInfo />
      <WelcomeSection ticketsPage data={data} />
    </div>
  );
}

export default MyClasses;
