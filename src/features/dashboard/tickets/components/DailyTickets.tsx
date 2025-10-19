import { useQueries, useQuery } from "@tanstack/react-query";
import { getArticles } from "../../../../services/articlesAPI";
import Spinner from "../../../../components/Spinner";
import TicketCard, { ITicket } from "./TicketCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMe, getMyChild } from "../../../../services/userAPI";
import { useTranslation } from "react-i18next";

function DailyTickets() {
  const { t } = useTranslation("tickets");
  const { childId } = useParams();
  const [ageGroup, setAgeGroup] = useState("adult");

  const [
    { data: meData, isLoading: isLoadingMe, isPending },
    { data: childData, isLoading: isLoadingChild },
  ] = useQueries({
    queries: [
      {
        queryKey: ["me"],
        queryFn: getMe,
      },
      {
        queryKey: ["child", childId],
        queryFn: () => getMyChild(childId!),
        enabled: !!childId,
      },
    ],
  });

  const me = childId ? childData?.myChild : meData;

  useEffect(
    function () {
      if (!me) return;
      if (me.age < 26) {
        setAgeGroup(me.ageGroup[0]);
      } else {
        setAgeGroup("adult");
      }
    },
    [me],
  );

  const { data, isLoading } = useQuery({
    queryKey: ["dailyTickets", ageGroup],
    queryFn: () => getArticles("V", ageGroup, "dnevna"),
    enabled: !isPending,
  });

  if (isLoading || isLoadingChild || isLoadingMe) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium">{t("daily")}</p>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
        {data.articles.map((ticket: ITicket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default DailyTickets;
