import { useQuery } from "@tanstack/react-query";
import { getGiftArticles } from "../../../../services/articlesAPI";
import { useParams } from "react-router";
import Spinner from "../../../../components/Spinner";
import { ITicket } from "../../tickets/components/TicketCard";
import GiftCard from "./GiftCard";

function GiftActivities() {
  const { ageGroup } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["giftActivities", ageGroup],
    queryFn: () => getGiftArticles(ageGroup!, "A"),
    enabled: !!ageGroup,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium">Aktivnosti</p>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
        {data.articles.map((article: ITicket) => (
          <GiftCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default GiftActivities;
