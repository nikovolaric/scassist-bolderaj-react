import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleDateClasses } from "../../../../services/classAPI";
import ChooseClassCard, { IClassInfo } from "./ChooseClassCard";
import { useParams } from "react-router";

function ChooseSingleDateClass() {
  const { id, childId } = useParams();
  const queryClient = useQueryClient();

  const ageGroup = childId
    ? queryClient.getQueryData<{ myChild: { ageGroup: string; age: number } }>([
        "child",
      ])!.myChild.ageGroup
    : undefined;

  const { data, isPending } = useQuery({
    queryKey: ["classesSingle"],
    queryFn: () => getSingleDateClasses(id!, ageGroup),
  });

  if (isPending) {
    return <p>...</p>;
  }

  if (data.classes.length === 0) {
    return (
      <div>
        <p className="text-xl font-semibold">
          Trenutno ni razpisanih datumov za to aktivnost.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-8">
      {data.classes.map((el: IClassInfo) => (
        <ChooseClassCard key={el._id} classInfo={el} />
      ))}
    </div>
  );
}

export default ChooseSingleDateClass;
