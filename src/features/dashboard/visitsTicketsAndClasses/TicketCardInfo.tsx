import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { getMyUnusedTickets } from "../../../services/ticketsAPI";
import { useTranslation } from "react-i18next";

function TicketCardInfo() {
  const { t, i18n } = useTranslation("common");
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
      <p className="text-lg font-medium">{t("dashboard.myTicketsNodata")}</p>
    );
  }

  const { unusedTickets } = data;

  const ticket = unusedTickets[0];

  if (!ticket || !ticket.validUntil) {
    return (
      <p className="text-lg font-medium">
        <p className="text-lg font-medium">{t("dashboard.myTicketsNodata")}</p>
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
        <p className="text-lg font-semibold">{ticket.name[i18n.language]}</p>
        <p className="text-gray border-gray rounded-lg border bg-white px-2 text-sm font-medium shadow">
          {t("validUntil")}{" "}
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
              {ticket.visits - ticket.visitsLeft} {t("dashboard.visits")} od{" "}
              {ticket.visits} {t("dashboard.tickets")}
            </p>
            <progress
              max={ticket.visits}
              value={ticket.visits - ticket.visitsLeft}
            />
            <p className="self-end text-sm">
              {t("dashboard.remainingTickets")} {ticket.visitsLeft}{" "}
              {t("dashboard.tickets")}.
            </p>
          </>
        )}
        {ticket.type === "terminska" && (
          <>
            <p className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {ticket.used ? (
                <>
                  <span>
                    {t("dashboard.validFor")} {daysLeft} {t("dashboard.days")}
                  </span>
                  {ticket.usedVisits > 0 && (
                    <span className="self-end text-sm lg:self-auto">
                      {t("dashboard.visitsWithTicket")}: {ticket.usedVisits}
                    </span>
                  )}
                </>
              ) : (
                `${t("dashboard.ticketNeedsActivation")} ${daysLeft} ${t("dashboard.days")}`
              )}
            </p>
            <progress
              max={ticket.duration}
              value={ticket.duration - daysLeft}
            />
            <p className="self-end text-sm">{t("dashboard.noVisitsLimit")}</p>
          </>
        )}
        {ticket.type === "dnevna" && (
          <>
            <p>
              0 {t("dashboard.visits")} 1 {t("dashboard.tickets")}
            </p>
            <progress max={1} value={0} />
            <p className="self-end text-sm">
              {t("dashboard.remainingTickets")} 1 {t("dashboard.tickets")}.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TicketCardInfo;
