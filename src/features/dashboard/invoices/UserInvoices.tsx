import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";
import { useState } from "react";
import { downloadMyInvoice, getMyInvoices } from "../../../services/invoiceAPI";

function UserInvocies() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const { data, isPending } = useQuery({
    queryKey: ["invoices", year],
    queryFn: () => getMyInvoices(year),
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 md:mx-auto md:w-3/4 lg:mx-auto lg:gap-10 xl:w-2/3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold lg:text-3xl">Moji računi</h1>
        <select
          onChange={(e) => setYear(e.target.value)}
          className="cursor-pointer text-lg font-bold outline-none lg:text-xl"
          value={year}
        >
          {Array.from({ length: new Date().getFullYear() - 2024 }).map(
            (_, i) => (
              <option key={(i + 1) * 10} value={currentYear - i}>
                {currentYear - i}
              </option>
            ),
          )}
        </select>
      </div>
      {data.invoices.length === 0 && (
        <p className="text-lg font-medium">
          Trenutno še nimaš računa v tekočem letu.
        </p>
      )}
      {data.invoices.length > 0 && (
        <div className="flex flex-col gap-0.5">
          <div className="bg-primary/50 grid h-11 grid-cols-[3fr_2fr_2fr] items-center gap-5 rounded-xl px-3">
            <p className="text-sm font-semibold text-black/75 lg:text-lg">
              Št. računa
            </p>
            <p className="text-sm font-semibold text-black/75 lg:text-lg">
              Datum izdaje
            </p>
            <p></p>
          </div>
          {data.invoices.map(
            (invoice: {
              invoiceData: {
                businessPremises: string;
                deviceNo: string;
                year: string;
                invoiceNo: string;
              };
              invoiceDate: string;
              _id: string;
            }) => (
              <DownloadInvoiceCard
                key={invoice._id}
                invoiceData={invoice.invoiceData}
                date={invoice.invoiceDate}
                id={invoice._id}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function DownloadInvoiceCard({
  invoiceData,
  date,
  id,
}: {
  invoiceData: {
    businessPremises: string;
    deviceNo: string;
    year: string;
    invoiceNo: string;
  };
  date: string;
  id: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);

      const data = await downloadMyInvoice(id);

      if (data instanceof Error) return data;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoiceData.businessPremises}-${invoiceData.deviceNo}-${invoiceData.invoiceNo}-${invoiceData.year}.pdf`;
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
      <p className="text-sm font-medium text-black/75 lg:text-lg">{`${invoiceData.businessPremises}-${invoiceData.deviceNo}-${invoiceData.invoiceNo}-${invoiceData.year}`}</p>
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

export default UserInvocies;
