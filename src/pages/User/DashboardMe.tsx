import Header from "../../components/Header";
import MyProfile from "../../features/dashboard/components/MyProfile";

function DashboardMe() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <MyProfile />
    </div>
  );
}

export default DashboardMe;
