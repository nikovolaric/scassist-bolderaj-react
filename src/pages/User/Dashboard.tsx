import { useQueryClient } from "@tanstack/react-query";
import Logo from "../../components/Logo";
import MyChildrenSection from "../../features/dashboard/components/MyChildrenSection";
import MyClimbingSection from "../../features/dashboard/components/MyClimbingSection";
// import UserBox from "../../features/dashboard/components/UserBox";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";
import NavMenu from "../../components/NavMenu";

function Dashboard() {
  const queryClient = useQueryClient();
  const me: { parentOf: { child: string }[] } | undefined =
    queryClient.getQueryData(["me"])!;

  return (
    <div className="my-16 flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <div className="w-1/2 md:w-1/3 lg:w-1/6">
          <Logo />
        </div>
        <NavMenu />
      </div>
      <div className="flex flex-col gap-12 lg:mt-12 lg:gap-24">
        <WelcomeSection />
        <MyClimbingSection />
        {me.parentOf.length > 0 && <MyChildrenSection />}
      </div>
    </div>
  );
}

export default Dashboard;
