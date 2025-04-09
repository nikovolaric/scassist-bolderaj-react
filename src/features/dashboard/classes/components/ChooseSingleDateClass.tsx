import { useQuery } from "@tanstack/react-query";
import { getSingleDateClasses } from "../../../../services/classAPI";
import ChooseClassCard, { IClassInfo } from "./ChooseClassCard";

function ChooseSingleDateClass() {
  const { data, isPending } = useQuery({
    queryKey: ["classesSingle"],
    queryFn: getSingleDateClasses,
  });

  if (isPending) {
    return <p>...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {data.classes.map((el: IClassInfo) => (
        <ChooseClassCard key={el._id} classInfo={el} />
      ))}
    </div>
  );
}

export default ChooseSingleDateClass;
