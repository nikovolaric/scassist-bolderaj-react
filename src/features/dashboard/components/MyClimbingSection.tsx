import MyClasses from "../visitsTicketsAndClasses/MyClasses";
import MyVisits from "../visitsTicketsAndClasses/MyVisits";
import MyTickets from "./MyTickets";
import { useTranslation } from "react-i18next";

function MyClimbingSection() {
  const { t } = useTranslation("common");

  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold">{t("dashboard.myClimbing")}</h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-6 xl:grid-cols-3">
        <MyTickets />
        <MyVisits page />
        <MyClasses />
      </div>
    </section>
  );
}

export default MyClimbingSection;
