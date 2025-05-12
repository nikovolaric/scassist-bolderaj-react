import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { getMyUnusedTickets } from "../../../services/ticketsAPI";

function TicketCardInfo() {
  const { data, isPending } = useQuery({
    queryKey: ["myTickets"],
    queryFn: getMyUnusedTickets,
    retry: 1,
  });

  if (isPending || data instanceof Error) {
    return <Spinner />;
  }

  if (data.results === 0) {
    return (
      <p className="text-lg font-medium">
        Podatki o veljavnih vstopnicah še niso na voljo.
      </p>
    );
  }

  const { unusedTickets } = data;

  const ticket = unusedTickets[0];

  if (!ticket || !ticket.validUntil) {
    return (
      <p className="text-lg font-medium">
        Podatki o veljavnih vstopnicah še niso na voljo.
      </p>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(ticket.validUntil).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="bg-neutral border-gray/80 flex flex-col gap-8 rounded-xl border px-3 py-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{ticket.name.sl}</p>
        <p className="text-gray border-gray rounded-lg border bg-white px-2 text-sm font-medium shadow">
          Velja do{" "}
          {new Date(ticket.validUntil).toLocaleDateString("sl-SI", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {ticket.type === "paket" && (
          <>
            <p>
              {ticket.visits - ticket.visitsLeft} obiskov od {ticket.visits}{" "}
              vstopnic
            </p>
            <progress
              max={ticket.visits}
              value={ticket.visits - ticket.visitsLeft}
            />
            <p className="self-end text-sm">
              Preostane vam še {ticket.visitsLeft} vstopnic.
            </p>
          </>
        )}
        {ticket.type === "terminska" && (
          <>
            <p>
              {ticket.used
                ? `Velja še ${daysLeft} dni`
                : `Karto je potrebno aktivirati v ${daysLeft} dneh`}
            </p>
            <progress
              max={ticket.duration}
              value={ticket.duration - daysLeft}
            />
            <p className="self-end text-sm">
              S to vstopnico ni omejitve obiskov.
            </p>
          </>
        )}
        {ticket.type === "dnevna" && (
          <>
            <p>0 obiskov 1 vstopnice</p>
            <progress max={1} value={0} />
            <p className="self-end text-sm">Preostane vam še 1 vstopnica.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default TicketCardInfo;
