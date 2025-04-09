import DailyTickets from "../features/dashboard/tickets/components/DailyTickets";
import LongtermTickets from "../features/dashboard/tickets/components/LongtermTickets";
import PackageTickets from "../features/dashboard/tickets/components/PackageTickets";
import Header from "../components/Header";

function Tickets() {
  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <h1 className="text-2xl font-semibold lg:text-3xl">Nakup vstopnice</h1>
        <DailyTickets />
        <LongtermTickets />
        <PackageTickets />
      </div>
    </div>
  );
}

export default Tickets;
