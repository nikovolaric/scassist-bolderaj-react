import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getGiftArticles } from "../../../../services/articlesAPI";
import Spinner from "../../../../components/Spinner";
import GiftCard from "./GiftCard";
import { ITicket } from "../../tickets/components/TicketCard";

function GiftTickets() {
  const { ageGroup } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["giftTickets", ageGroup],
    queryFn: () => getGiftArticles(ageGroup!, "V"),
    enabled: !!ageGroup,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium">Vstopnice</p>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-6 xl:grid-cols-3">
        {data.articles.map((article: ITicket) => (
          <GiftCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default GiftTickets;
