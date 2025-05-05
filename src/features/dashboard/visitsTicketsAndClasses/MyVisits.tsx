import { useQuery } from "@tanstack/react-query";
import { getMyLastVisits } from "../../../services/visitsAPI";
import Spinner from "../../../components/Spinner";
import MyVisitsCard, { IVisit } from "./MyVisitsCard";
import LinkBtn from "../../../components/LinkBtn";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function MyVisits({ page }: { page?: boolean }) {
  const { data, isPending } = useQuery({
    queryKey: ["myVisits"],
    queryFn: () => getMyLastVisits(page ? 3 : 7),
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-white px-5 py-8">
      <p className="font-quicksand text-lg font-bold lg:text-xl">
        PRETEKLI OBISKI
      </p>
      {data.results === 0 && (
        <p className="text-lg font-medium">
          Trenutno še nimate zabeleženega obiska
        </p>
      )}
      {data.results > 0 && (
        <div className="flex flex-col gap-8">
          {data.visits.map((visit: IVisit) => (
            <MyVisitsCard key={visit._id} visit={visit} />
          ))}
        </div>
      )}
      {page && (
        <div className="mt-auto self-end">
          <LinkBtn to="/dashboard/mytickets" type="primary">
            <p className="flex items-center gap-2">
              Oglej si vse vstopnice{" "}
              <ChevronRightIcon className="h-4 stroke-3" />
            </p>
          </LinkBtn>
        </div>
      )}
    </div>
  );
}

export default MyVisits;
