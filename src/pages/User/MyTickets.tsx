import Header from "../../components/Header";
import WelcomeSection from "../../features/dashboard/components/WelcomeSection";
import MyValidTickets from "../../features/dashboard/visitsTicketsAndClasses/MyValidTickets";
import MyVisits from "../../features/dashboard/visitsTicketsAndClasses/MyVisits";
import MyVisitsThisYear from "../../features/dashboard/visitsTicketsAndClasses/MyVisitsThisYear";

function MyTickets() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14 lg:gap-16">
        <h1 className="text-2xl font-semibold lg:text-3xl">
          Moje vstopnice in obiski
        </h1>
        <div className="flex flex-col gap-12 gap-x-5 md:grid md:grid-cols-2 xl:grid-cols-3">
          <MyValidTickets />
          <MyVisits />
          <MyVisitsThisYear />
        </div>
        <div className="mt-20">
          <WelcomeSection ticketsPage />
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
