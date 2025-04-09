import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router";
import { getChildClasses } from "../../services/classAPI";

function ChildClasses() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["myclasses"],
    queryFn: () => getChildClasses(id!),
    enabled: !!id,
  });
  if (isPending) {
    return <Spinner />;
  }
  if (!data.classes) {
    return (
      <div className="flex flex-col gap-6 rounded-xl bg-white px-5 py-8 md:px-6 lg:py-10 xl:gap-12">
        <p className="font-quicksand text-lg font-bold lg:text-xl">
          OTROKOVE VADBE IN TEČAJI
        </p>
        <p className="font-medium">
          Trenutno vaš otrok ni vpisan na noben tečaj ali vadbo
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
          article: {
            name: string;
          };
        }) => (
          <p
            key={el._id}
            className="border-gray rounded-lg border px-3 py-4 font-medium"
          >
            {el.article.name},{" "}
            {Array.from(
              new Set(
                el.dates.map((day) =>
                  new Date(day).toLocaleDateString("si-SL", {
                    weekday: "long",
                  }),
                ),
              ),
            ).join(",")}{" "}
            od {el.hours.join(" - ")}
          </p>
        ),
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
