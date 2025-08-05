import { useQueries } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router";
import { getChildClasses } from "../../services/classAPI";
import { getMyUnpaiedPreInvoices } from "../../services/preInvoiceAPI";

function ChildClasses() {
  const { childId } = useParams();

  const [
    { data, isPending },
    { data: preInvoiceData, isPending: isPendingPre },
  ] = useQueries({
    queries: [
      {
        queryKey: ["childClasses"],
        queryFn: () => getChildClasses(childId!),
        enabled: !!childId,
      },
      { queryKey: ["preInvoices"], queryFn: getMyUnpaiedPreInvoices },
    ],
  });

  if (isPending || isPendingPre) {
    return <Spinner />;
  }

  const { preInvoices } = preInvoiceData;

  if (!data.classes || data.classes.length === 0) {
    return (
      <div className="flex flex-col gap-8 rounded-lg bg-white px-5 py-8">
        <p className="font-quicksand text-lg font-bold">
          OTROKOVE AKTIVNOSTI IN VADBE
        </p>
        <p className="font-medium lg:text-lg">
          Trenutno vaš otrok ni vpisan na nobeno aktivnost ali vadbo
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        OTROKOVE VADBE IN TEČAJI
      </p>
      {data.classes.map(
        (el: {
          _id: string;
          dates: string[];
          hours: string[];
          className: {
            sl: string;
          };
        }) => {
          const preInvoice = preInvoices.filter(
            (preInvoice: { classes: string[] }) =>
              preInvoice.classes.includes(el._id),
          );

          const isNotPaid = preInvoice.length > 0;

          return (
            <div
              key={el._id}
              className="border-gray/80 bg-neutral flex flex-col gap-1 rounded-xl border px-3 py-4"
            >
              <p className="font-semibold">
                {el.className.sl}
                {el.dates.length > 1 ? " - vodena vadba" : ""}
              </p>
              {el.dates.length > 1 && (
                <p className="flex items-center gap-1 text-sm capitalize">
                  <span className="font-semibold normal-case">
                    Izbran termin:
                  </span>
                  {Array.from(
                    new Set(
                      el.dates.map((day) =>
                        new Date(day).toLocaleDateString("si-SL", {
                          weekday: "long",
                        }),
                      ),
                    ),
                  ).join(",")}
                  , {el.hours.join(" - ")}
                </p>
              )}
              {el.dates.length === 1 && (
                <p className="flex items-center gap-1 text-sm capitalize">
                  <span className="font-semibold normal-case">
                    Izbran termin:
                  </span>
                  {new Date(el.dates[0]).toLocaleDateString()},{" "}
                  {el.hours.join(" - ")}
                </p>
              )}
              {isNotPaid && (
                <p className="self-end font-medium text-red-500">
                  {`Predračun ${preInvoice[0].preInvoiceNumber}-${new Date(preInvoice[0].date).getFullYear()}`}{" "}
                  še ni poravnan!
                </p>
              )}
            </div>
          );
        },
      )}
      {/* <div className="mt-auto self-end">
              <LinkBtn to="/dashboard/mytickets" type="primary">
                <p className="flex items-center gap-2">
                  Oglej si več <ChevronRightIcon className="h-4 stroke-3" />
                </p>
              </LinkBtn>
            </div> */}
    </div>
  );
}

export default ChildClasses;
