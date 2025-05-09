import { useParams } from "react-router";
import Header from "../../components/Header";
import GiftTickets from "../../features/dashboard/gifts/components/GiftTickets";
import GiftActivities from "../../features/dashboard/gifts/components/GiftActivities";

function Gifts() {
  const { ageGroup } = useParams();

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <div>
          <h1 className="font-semibold">Nakup vstopnice</h1>
          <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
            Starostna skupina prejemnika:{" "}
            {ageGroup === "preschool"
              ? "3 - 5 let"
              : ageGroup === "school"
                ? "6 - 14 let"
                : ageGroup === "student"
                  ? "15 - 25 let"
                  : "Odrasli (+26 let)"}
          </p>
          <p className="mt-8 flex gap-4 font-semibold">
            <span className="from-primary to-secondary drop-shadow-btn flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gradient-to-r font-semibold">
              i
            </span>
            Darilni bon je vezan na starostno skupino prejemnika. Vsi darilni
            boni veljajo eno leto od dneva nakupa.
          </p>
        </div>
        <GiftTickets />
        <GiftActivities />
      </div>
    </div>
  );
}

export default Gifts;
