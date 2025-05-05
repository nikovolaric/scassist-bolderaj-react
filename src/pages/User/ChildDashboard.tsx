import Header from "../../components/Header";
import ChildClimbingSection from "../../features/childDashboard/ChildClimbingSection";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";

function ChildDashboard() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-12 lg:mt-12 lg:gap-24">
        <ChildClimbingSection />
        <WelcomeSection ticketsPage />
      </div>
    </div>
  );
}

export default ChildDashboard;
