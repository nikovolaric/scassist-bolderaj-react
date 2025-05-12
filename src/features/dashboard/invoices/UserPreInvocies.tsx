import { useQuery } from "@tanstack/react-query";
import {
  downloadMyPreinvoice,
  getMyUnpaiedPreInvoices,
} from "../../../services/preInvoiceAPI";
import Spinner from "../../../components/Spinner";
import { useState } from "react";

function UserPreInvocies() {
  const { data, isPending } = useQuery({
    queryKey: ["preInvoices"],
    queryFn: getMyUnpaiedPreInvoices,
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 md:mx-auto md:w-3/4 lg:mx-auto lg:gap-10 xl:w-2/3">
      <h1 className="text-2xl font-semibold lg:text-3xl">Odprti predračuni</h1>
      {data.preInvoices.length === 0 && (
        <p className="text-lg font-medium">
          Trenutno nimaš neporavnanih predračunov.
        </p>
      )}
      {data.preInvoices.length > 0 && (
        <div className="flex flex-col gap-0.5">
          <div className="bg-primary/50 grid h-11 grid-cols-[3fr_2fr_2fr] items-center gap-5 rounded-xl px-3">
            <p className="text-sm font-semibold text-black/75 lg:text-lg">
              Št. predračuna
            </p>
            <p className="text-sm font-semibold text-black/75 lg:text-lg">
              Datum izdaje
            </p>
            <p></p>
          </div>
          {data.preInvoices.map(
            (preInvoice: {
              preInvoiceNumber: string;
              date: string;
              _id: string;
            }) => (
              <DownloadPreInvoiceCard
                key={preInvoice._id}
                number={preInvoice.preInvoiceNumber}
                date={preInvoice.date}
                id={preInvoice._id}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function DownloadPreInvoiceCard({
  number,
  date,
  id,
}: {
  number: string;
  date: string;
  id: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);

      const data = await downloadMyPreinvoice(id);

      if (data instanceof Error) return data;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Predračun-${number}-${new Date(date).getFullYear()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid h-14 grid-cols-[3fr_2fr_2fr] items-center gap-5 rounded-xl bg-white px-3 lg:h-16">
      <p className="text-sm font-medium text-black/75 lg:text-lg">{`${number}-${new Date(date).getFullYear()}`}</p>
      <p className="text-sm text-black/75 lg:text-lg">
        {new Date(date).toLocaleDateString("sl-SI", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <button
        className="from-primary to-secondary drop-shadow-btn hover:to-primary disabled:from-gray disabled:to-gray cursor-pointer rounded-lg bg-gradient-to-r px-3 py-1 text-sm font-semibold transition-colors duration-300 disabled:cursor-not-allowed lg:text-lg"
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading ? (
          "..."
        ) : (
          <p>
            Prenesi <span className="hidden md:inline-block">PDF</span>
          </p>
        )}
      </button>
    </div>
  );
}

export default UserPreInvocies;
