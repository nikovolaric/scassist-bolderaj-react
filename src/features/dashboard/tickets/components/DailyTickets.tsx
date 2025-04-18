import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../../../services/articlesAPI";
import Spinner from "../../../../components/Spinner";
import TicketCard, { ITicket } from "./TicketCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMe, getMyChild } from "../../../../services/userAPI";

function DailyTickets() {
  const { childId } = useParams();
  const [ageGroup, setAgeGroup] = useState("adult");

  const { data: childData, isLoading: isLoadingChild } = useQuery({
    queryKey: ["child", childId],
    queryFn: () => getMyChild(childId!),
    enabled: !!childId,
  });
  const {
    data: meData,
    isLoading: isLoadingMe,
    isPending,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const me = childId ? childData?.myChild : meData;

  useEffect(
    function () {
      if (!me) return;
      if (me.age < 18) {
        setAgeGroup(me.ageGroup);
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
      <p className="font-medium">Dnevne vstopnice</p>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
        {data.articles.map((ticket: ITicket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default DailyTickets;
