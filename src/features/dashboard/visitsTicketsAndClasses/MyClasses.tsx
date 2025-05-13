import { useQuery } from "@tanstack/react-query";
import { getMyClasses } from "../../../services/classAPI";
import Spinner from "../../../components/Spinner";
import LinkBtn from "../../../components/LinkBtn";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function MyClasses() {
  const { data, isPending } = useQuery({
    queryKey: ["myclasses"],
    queryFn: () => getMyClasses(2),
  });

  if (isPending || !data) {
    return <Spinner />;
  }

  if (!data.classes || data.classes.length === 0) {
    return (
      <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
        <p className="font-quicksand text-lg font-bold lg:text-xl">
          MOJE VADBE IN TEČAJI
        </p>
        <p className="text-lg font-medium">
          Trenutno nisi vpisan na nobeno aktivnost ali vadbo.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        MOJE VADBE IN TEČAJI
      </p>
      <div className="flex flex-col gap-6">
        {data.classes.map(
          (el: {
            _id: string;
            dates: string[];
            hours: string[];
            className: {
              sl: string;
              en: string;
            };
          }) => (
            <div
              key={el._id}
              className="border-gray/80 bg-neutral rounded-xl border px-3 py-4"
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
                        new Date(day).toLocaleDateString("sl-SI", {
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
            </div>
          ),
        )}
      </div>
      <div className="mt-auto self-end">
        <LinkBtn to="/dashboard/myclasses" type="primary">
          <p className="flex items-center gap-2">
            Oglej si več <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default MyClasses;
