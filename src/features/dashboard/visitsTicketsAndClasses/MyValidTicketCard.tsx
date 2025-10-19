export interface iValidTicket {
  _id: string;
  name: {
    sl: string;
    en: string;
  };
  validUntil: string;
  type: string;
  visits: number;
  visitsLeft: number;
  used: boolean;
  duration: number;
  usedVisits: number;
}

function MyValidTicketCard({ ticket }: { ticket: iValidTicket }) {
  const {
    name,
    validUntil,
    type,
    visits,
    visitsLeft,
    used,
    duration,
    usedVisits,
  } = ticket;

  const daysLeft = Math.ceil(
    (new Date(validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="bg-neutral border-gray/80 flex flex-col gap-8 rounded-xl border px-3 py-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{name.sl}</p>
        <p className="text-gray border-gray rounded-lg border bg-white px-2 text-sm font-medium shadow">
          Velja do{" "}
          {new Date(validUntil).toLocaleDateString("sl-SI", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {type === "paket" && (
          <>
            <p>
              {visits - visitsLeft} obiskov od {visits} vstopnic
            </p>
            <progress max={visits} value={visits - visitsLeft} />
            <p className="self-end text-sm">
              Preostane ti še {visitsLeft} vstopnic.
            </p>
          </>
        )}
        {type === "terminska" && (
          <>
            <p className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {used ? (
                <>
                  <span>Vstopnica velja še {daysLeft} dni</span>
                  {usedVisits > 0 && (
                    <span className="self-end text-sm lg:self-auto">
                      Obiski s vstopnico: {usedVisits}
                    </span>
                  )}
                </>
              ) : (
                `Vstopnico je potrebno aktivirati v ${daysLeft} dneh`
              )}
            </p>
            <progress max={duration} value={duration - daysLeft} />
            <p className="self-end text-sm">
              S to vstopnico ni omejitve obiskov.
            </p>
          </>
        )}
        {type === "dnevna" && (
          <>
            <p>0 obiskov 1 vstopnice</p>
            <progress max={1} value={0} />
            <p className="self-end text-sm">Preostane ti še 1 vstopnica.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MyValidTicketCard;
