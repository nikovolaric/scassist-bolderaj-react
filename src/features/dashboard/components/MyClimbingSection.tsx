import MyClasses from "../visitsTicketsAndClasses/MyClasses";
import MyVisits from "../visitsTicketsAndClasses/MyVisits";
import MyTickets from "./MyTickets";

function MyClimbingSection() {
  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold">Moje plezanje v Bolderaju</h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-6 xl:grid-cols-3">
        <MyTickets />
        <MyVisits page />
        <MyClasses />
      </div>
    </section>
  );
}

export default MyClimbingSection;
