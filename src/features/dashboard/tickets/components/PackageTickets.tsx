import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "../../../../services/articlesAPI";
import Spinner from "../../../../components/Spinner";
import TicketCard, { ITicket } from "./TicketCard";
import { useParams } from "react-router";

function PackageTickets() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const me = id
    ? queryClient.getQueryData<{ myChild: { ageGroup: string } }>(["child"])!
        .myChild
    : queryClient.getQueryData<{ ageGroup: string }>(["me"])!;

  const { data, isLoading } = useQuery({
    queryKey: ["packageTickets"],
    queryFn: () => getArticles("V", me.ageGroup, "paket"),
  });

  if (isLoading) {
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

export default PackageTickets;
