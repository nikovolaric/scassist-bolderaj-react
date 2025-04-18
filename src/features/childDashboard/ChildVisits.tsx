import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getChildLastVisits } from "../../services/visitsAPI";
import Spinner from "../../components/Spinner";
import MyVisitsCard, {
  IVisit,
} from "../dashboard/visitsTicketsAndClasses/MyVisitsCard";

function ChildVisits() {
  const { childId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["childVisits"],
    queryFn: () => getChildLastVisits(childId!, 10),
    enabled: !!childId,
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
    </div>
  );
}

export default ChildVisits;
