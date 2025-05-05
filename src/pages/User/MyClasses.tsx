import Header from "../../components/Header";
import MyClassesInfo from "../../features/dashboard/classes/components/MyClassesInfo";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";

function MyClasses() {
  return (
    <div className="my-16 flex flex-col gap-20">
      <Header />
      <MyClassesInfo />
      <WelcomeSection ticketsPage />
    </div>
  );
}

export default MyClasses;
