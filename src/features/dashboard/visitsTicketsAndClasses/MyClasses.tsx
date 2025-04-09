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

  if (isPending) {
    return <Spinner />;
  }

  if (!data.classes) {
    return (
      <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
        <p className="font-quicksand text-lg font-bold lg:text-xl">
          MOJE VADBE IN TEČAJI
        </p>
        <p className="font-medium">
          Trenutno niste vpisani na noben tečaj ali vadbo
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        MOJE VADBE IN TEČAJI
      </p>
      {data.classes.map(
        (el: {
          _id: string;
          dates: string[];
          hours: string[];
          className: string;
        }) => (
          <div
            key={el._id}
            className="border-gray/80 bg-neutral rounded-xl border px-3 py-4"
          >
            <p className="font-semibold">{el.className}</p>
            <p className="flex items-center gap-1 text-sm capitalize">
              <span className="font-semibold normal-case">Izbran termin:</span>
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
          </div>
        ),
      )}
      <div className="mt-auto self-end">
        <LinkBtn to="/dashboard/mytickets" type="primary">
          <p className="flex items-center gap-2">
            Oglej si več <ChevronRightIcon className="h-4 stroke-3" />
          </p>
        </LinkBtn>
      </div>
    </div>
  );
}

export default MyClasses;
