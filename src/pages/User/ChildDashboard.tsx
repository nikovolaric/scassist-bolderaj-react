import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import ChildClimbingSection from "../../features/childDashboard/ChildClimbingSection";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";
import { getMe } from "../../services/userAPI";

function ChildDashboard() {
  const { data, isPending } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isPending) return <Spinner />;

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-12 lg:mt-12 lg:gap-24">
        <ChildClimbingSection />
        <WelcomeSection ticketsPage data={data} />
      </div>
    </div>
  );
}

export default ChildDashboard;
