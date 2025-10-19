import DailyTickets from "../../features/dashboard/tickets/components/DailyTickets";
import LongtermTickets from "../../features/dashboard/tickets/components/LongtermTickets";
import PackageTickets from "../../features/dashboard/tickets/components/PackageTickets";
import Header from "../../components/Header";
import { useParams } from "react-router";
import { useQueries} from "@tanstack/react-query";
import { getMe, getMyChild } from "../../services/userAPI";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";

function Tickets() {
  const {t} = useTranslation("tickets")
  const { childId } = useParams();
 
  const [{ data, isLoading },{data:me,isPending}] = useQueries({queries:[
    {
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  },
  {
    queryKey: ["me"],
    queryFn:  getMe,
  }
]});

  if (isLoading||isPending) {
    return <Spinner />;
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-14">
        <div>
          <h1 className="font-semibold">{t("buyTicket")}</h1>
          {me.parentOf.length > 0 && (
            <p className="bg-gray/80 mt-8 w-fit rounded-lg px-3 py-1 font-medium">
              {t("buyingFor")}:{" "}
              {!childId
                ? `${me.firstName} (${t("me")})`
                : `${data.myChild.firstName} (${data.myChild.age} ${t("years")})`}
            </p>
          )}
        </div>
        <DailyTickets />
        <LongtermTickets />
        <PackageTickets />
      </div>
    </div>
  );
}

export default Tickets;
