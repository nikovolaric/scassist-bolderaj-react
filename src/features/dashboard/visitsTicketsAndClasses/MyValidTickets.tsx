import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { getMyUnusedTickets } from "../../../services/ticketsAPI";
import MyValidTicketCard, { iValidTicket } from "./MyValidTicketCard";

function MyValidTickets() {
  const { data, isPending } = useQuery({
    queryKey: ["myTickets"],
    queryFn: getMyUnusedTickets,
  });

  if (isPending || data.error) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-white px-5 py-8">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        VELJAVNE VSTOPNICE
      </p>
      {data.results === 0 && (
        <p className="text-lg font-medium">
          Trenutno nimate veljavnih vstopnic
        </p>
      )}
      {data.results > 0 && (
        <div className="flex flex-col gap-8">
          {data.unusedTickets.map((ticket: iValidTicket) => (
            <MyValidTicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyValidTickets;
